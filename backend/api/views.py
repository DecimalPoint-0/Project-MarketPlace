from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.models import F

from core import models
from core import serializers
# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


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
        return models.Project.objects.all()
    

class ProjectDetailsAPIView(generics.RetrieveAPIView):
    """API View for retrieving project details"""

    serializer_class = serializers.ProjectSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        id = self.kwargs['project_id']
        return models.Project.objects.get(id=id)
