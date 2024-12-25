from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.models import F
from rest_framework_simplejwt.authentication import JWTAuthentication

from core import models
from core import serializers
from django.core.mail import send_mail, EmailMessage

# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from decimal import Decimal

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from django.conf import settings
import requests
from core import mails

class RegistrationAPIView(generics.CreateAPIView):
    """API View for creating user"""

    serializer_class = serializers.RegisterUserSerializer
    permission_classes = [AllowAny]


class ObtainTokenPairAPIView(TokenObtainPairView):
    """API View for creating JWT Access and Referesh Token for Users"""
    serializer_class = serializers.MyTokenObtainPairSerializer


class ProjectAPIView(generics.ListAPIView):
    """API View for creating projects"""

    serializer_class = serializers.ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return models.Project.objects.filter(status='Approved')
    

class ProjectDetailsAPIView(generics.RetrieveAPIView):
    """API View for retrieving project details"""

    serializer_class = serializers.ProjectDetailSerializer
    permission_classes = [AllowAny]
    queryset = models.Project.objects.filter(status='Approved')
    
    def get_object(self):
        id = self.kwargs['id']
        project = self.queryset.get(id=id)
        project.views += 1
        project.save()
        return project
    

class InitiatePaymentAPIView(APIView):
    """API View for processing purchase"""

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = get_object_or_404(models.Project, id=project_id)
        amount = int(project.price * 100)
        if request.user.is_authenticated:
            email = self.request.user.email
        else:
            email = request.data.get('email')
            print(request.user)
        
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }
        data = {
            "email": email,
            "amount": amount,
        }

        try:
            response = requests.post(
                "https://api.paystack.co/transaction/initialize",
                headers=headers,
                json=data
            )
            response_data = response.json()

            # Check if request to Paystack was successful
            if response.status_code == 200 and response_data.get("status"):
                # initiate payment in the database
                models.Payments.objects.get_or_create(
                    user=self.request.user,
                    item=project,
                    amount= Decimal(amount / 100),
                    status="Pending",
                    payment_reference=response_data['data']['reference']
                )
                return JsonResponse(response_data)
            else:
                return JsonResponse(
                    {"error": "Unable to initialize payment", "details": response_data},
                    status=400
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        
class VerifyPaymentAPIView(APIView):
    """API View for verifying payment status"""

    def post(self, request, *args, **kwargs):
        transaction_id = kwargs.get('id')

        if not transaction_id:
            return JsonResponse({"error": "Transaction ID is required"}, status=400)
        
        # check if payment has already been verified
        payment = get_object_or_404(models.Payments, payment_reference=transaction_id)

        # check if payment has been approved
        if payment.status == "Approved":
            return Response({'message': 'Payment has already been approved'}, status=status.HTTP_200_OK)

        # initialize headers
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        url = f"https://api.paystack.co/transaction/verify/{transaction_id}"

        try:
            response = requests.get(url, headers=headers)
            data = response.json()

            if response.status_code == 200 and data.get("status"):
                payment_status = data["data"]["status"]
                if payment_status == "success":

                    # process information 
                    amount_paid = data['data']['amount'] / 100 
                    recipient=data['data']['customer']['email']

                    # get payment and project associated with payment
                    project = payment.item

                    # update payment status in the database
                    payment.status = "Approved"
                    payment.save()

                    # credit user wallet
                    commission = Decimal(amount_paid * 0.9)
                    wallet = get_object_or_404(models.UsersWallet, user=project.author)
                    wallet.balance += commission
                    wallet.save()

                    # send email with attachment
                    mail_response = mails.send_email_with_attachment(project=project, recipient=recipient)
                    
                    # if email was sent successfully
                    if mail_response.get('status') == 200:
                        return JsonResponse({
                        "message": f"Payment successful, Project Sent to {recipient}",
                        "data": data["data"]
                    })
                    else:
                        # if project was not sent return error response with details
                        return JsonResponse({
                            "error": "Payment Successfull, but Failed to send project with attachment",
                            "details": mail_response 
                        }, status=500)
                else:
                    return JsonResponse({
                        "message": "Payment verification failed",
                        "status": payment_status
                    }, status=400)
            else:
                return JsonResponse({
                    "error": "Error verifying payment",
                    "details": data
                }, status=400)
        except Exception as e:
            return JsonResponse({
                "error": "An error occurred while verifying payment",
                "details": str(e)
            }, status=500)


class AuthorsAPIView(generics.ListAPIView):
    """API View for listing authors"""

    permission_classes = [AllowAny]
    serializer_class = serializers.AuthorSerializer

    def get_queryset(self):
        return models.User.objects.all()


class AuthorDetailsAPIView(generics.RetrieveAPIView):
    """API View for retrieving authors details"""

    permission_classes = [AllowAny]
    serializer_class = serializers.AuthorDetailsSerializer
    queryset = models.User.objects.all()

    def get_object(self):
        """Retrieving details of a particular user"""
        email = self.kwargs['email']
        return self.queryset.get(email=email)

class Categories(generics.ListAPIView):
    """API View for clisting available categories"""

    permission_classes = [AllowAny]
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        return models.Category.objects.all()
    

class ProjectCategories(generics.ListAPIView):
    """API view for list of projects in a category"""

    permission_classes = [AllowAny]
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        cat_id = self.kwargs['id']
        cat = get_object_or_404(models.Category, id=cat_id)
        return models.Project.objects.filter(category=cat)


class LikeProject(APIView):
    """API View for liking a project"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Project.objects.filter(status='Approved')

    def post(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = get_object_or_404(models.Project, id=project_id, status='Approved')
        user = request.user
        if user in project.like.all():
            project.like.remove(user)
            return Response({'message': 'Unliked'}, status=status.HTTP_200_OK)
        else:
            if user in project.dislikes.all():
                project.dislikes.remove(user)
            project.like.add(user)
            models.Notification.objects.create(
                user=request.user,
                action='liked',
                noti_for=project.author,
            )
            return Response({'message': 'Liked'}, status=status.HTTP_200_OK)


class DislikeProject(APIView):
    """API View for disliking a project"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Project.objects.filter(status='Approved')

    def post(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = get_object_or_404(models.Project, id=project_id, status='Approved')
        user = request.user
        if user in project.dislikes.all():
            project.dislikes.remove(user)
            return Response({'message': 'Disliked Removed'}, status=status.HTTP_200_OK)
        else:
            if user in project.like.all():
                project.like.remove(user)
            project.dislikes.add(user)
            models.Notification.objects.create(
                user=request.user,
                action='Disliked',
                noti_for=project.author,
            )
            return Response({'message': 'Disliked'}, status=status.HTTP_200_OK)


class Reviews(APIView):
    """API VIew for sending reviews"""
    pass


class Messages(generics.ListAPIView):
    """API View for Messages"""
    pass