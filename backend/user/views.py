from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from core import models
from core import serializers
from core import permissions

# Restframework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, APIView
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

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
        return self.queryset.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new project"""
        return serializer.save(author=self.request.user)


class MyProfileAPIView(generics.RetrieveUpdateAPIView):
    """API View for user's profile"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, permissions.UpdateOwnProfile]
    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return models.User.objects.get(id=self.request.user.id)


class ReferalDashboard(generics.ListAPIView):
    """API for list of referals available"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pass


class ApprovedProjectsAPIView(generics.ListAPIView):
    """API View for list of approved projects"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProjectDetailSerializer

    def get_queryset(self):
        return models.Project.objects.filter(author=self.request.user, 
                                             status='Approved')

class PendingProjectAPIView(generics.ListAPIView):
    """API VIew for list of projects awaiting approval"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProjectDetailSerializer

    def get_queryset(self):
        return models.Project.objects.filter(author=self.request.user, 
                                             status='Pending')


class DeclinedProjectsAPIView(generics.ListAPIView):
    """API VIew for list of projects declined"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProjectDetailSerializer

    def get_queryset(self):
        return models.Project.objects.filter(author=self.request.user, 
                                             status='Declined')
    
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
        return models.User.objects.get(id=self.request.user.id)


class NotificationSeenAPIView(APIView):
    """API view to mark notification as seen"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        noti_id = self.kwargs['noti_id']
        notification = models.Notification.objects.get(id=noti_id, 
                                         status=False)
        notification.status = True
        notification.save()
        return Response({'message': 'Notifcation Marked as seen'}, status=status.HTTP_200_OK)


class MyAccountAPIView(generics.RetrieveAPIView):
    """API view for user's account"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.AccountSerializer

    def get_object(self):
        return models.UsersWallet.objects.get(user=self.request.user)


class CashOutAPIView(APIView):
    """API View for user cashout"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'amount': openapi.Schema(type=openapi.TYPE_NUMBER),
            }
        )
    )

    def post(self, request, *args, **kwargs):

        amount = self.request.data['amount']
        account = models.UsersWallet.objects.get(user=self.request.user)

        if account.balance > 0.0:
            if account.balance >= amount:
                account.balance -= amount
                account.save()
                models.CashOut.objects.create(
                    amount=amount,
                    user=self.request.user,
                    status='Pending'
                )
                return Response({'message': 'Cash Out is pending'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Cannot Withdraw more than available balance'}, 
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Account Balance is too low'}, 
                                status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        queryset = models.CashOut.objects.filter(user=self.request.user)
        data = list(queryset.values())
        return JsonResponse(data, safe=False)
