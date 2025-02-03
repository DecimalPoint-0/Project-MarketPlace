"""
API Views associated to user
"""
from decimal import Decimal

# Django import 
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination

# local imports from core
from core import models
from core import serializers
from core import permissions

# Restframework
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

# documentation imports 
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class UserProjectAPIView(viewsets.ModelViewSet):
    """API View for creating project"""

    serializer_class = serializers.ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, permissions.UpdateOwnProject]
    queryset = models.Project.objects.all()

    def get_serializer_class(self):
        """Return a different serializer based on the request method"""
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.ProjectUploadSerializer  # Serializer with content field
        return serializers.ProjectSerializer

    def get_queryset(self):
        """Filter projects based on user"""

        cache_key = f"projects_{self.request.user.id}" # set cache key 
        projects = cache.get(cache_key) # get key from cache

        if not projects: #checks if the key exists
            # it not in cache
            projects = models.Project.objects.filter(
                author=self.request.user
            )
            print(projects)
            # set project to cache 
            cache.set(cache_key, projects, timeout=300)  # Cache for 5 minutes
        return projects
    
    def perform_create(self, serializer):
        """Create a new project"""
        return serializer.save(author=self.request.user)


class MyProfileAPIView(generics.RetrieveUpdateAPIView):
    """API View for user's profile"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, permissions.UpdateOwnProfile]
    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return get_object_or_404(models.User, id=self.request.user.id)


class ReferalDashboardAPIView(generics.ListAPIView):
    """API for list of referals available"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pass


class ProjectStatusAPIView(generics.ListAPIView):
    """Base class for project status views."""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProjectDetailSerializer

    def get_queryset(self):
        return models.Project.objects.filter(
            author=self.request.user, status=self.status
        )
    

class ApprovedProjectsAPIView(ProjectStatusAPIView):
    status = 'Approved'

class PendingProjectAPIView(ProjectStatusAPIView):
    status = 'Pending'

class DeclinedProjectsAPIView(ProjectStatusAPIView):
    status = 'Declined'
    
class NotificationAPIView(generics.ListAPIView):
    """API View for Notifications"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.NotificationSerializer

    def get_queryset(self):
        return models.Notification.objects.filter(project__author=self.request.user,
                                                  status=False).order_by('-id')
    

class UserStatsAPIView(generics.RetrieveAPIView):
    """API View for user stats"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.AuthorDetailsSerializer

    def get_object(self):
        return get_object_or_404(models.User, id=self.request.user.id)


class NotificationSeenAPIView(APIView):
    """API view to mark notification as seen"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        noti_id = self.kwargs.get('noti_id')
        notification = get_object_or_404(models.Notification, id=noti_id)
        
        if notification.status:
            return Response(
                {'message': 'Notification already marked as seen.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        notification.status = True
        notification.save()
        return Response({'message': 'Notifcation Marked as seen'}, status=status.HTTP_200_OK)


class MyAccountAPIView(generics.RetrieveUpdateAPIView):
    """API view for user's account"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.AccountSerializer

    def get_object(self):
        return get_object_or_404(models.UsersWallet, user=self.request.user)


def validate_cashout_data(data):
    try:
        amount = Decimal(data.get('amount', 0))
        if amount <= 0:
            raise ValidationError("Amount must be positive.")
        return amount
    except (TypeError, ValueError,  Decimal.InvalidOperation):
        raise ValidationError("Invalid withdrawal amount.")
    

class CashOutAPIView(APIView):
    """API View for user cashout"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = validate_cashout_data(request.data)
        account = get_object_or_404(models.UsersWallet, user=request.user)

        if account.balance < amount:
            return Response(
                {'message': 'Insufficient balance.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        account.balance -= amount
        account.save()

        models.CashOut.objects.create(
            amount=amount, user=request.user, status='Pending'
        )
        return Response({'message': 'Cashout request submitted.'}, status=status.HTTP_200_OK)
    
    # def get(self, request, *args, **kwargs):
    #     try:
    #         queryset = models.CashOut.objects.filter(user=self.request.user)
    #         data = list(queryset.values())
    #         return JsonResponse(data, safe=False)
    #     except Exception as e:
    #         return JsonResponse(
    #             {'message': 'Failed to fetch cashout data.'},
    #             status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #         )


class TransactionsAPIView(generics.ListAPIView):
    """API View for transactions (cashouts and sales)"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.TransactionSerializer

    def get_queryset(self):
        try: 
            return models.Transaction.objects.filter(user=self.request.user).order_by('-date')
        except Exception as e:
            return JsonResponse(
                {'message': 'Failed to fetch transaction history'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
