from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication

from core import models
from core import serializers
# Restframework
from rest_framework import status
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
    permission_classes = [IsAuthenticated]
    queryset = models.Project.objects.all()

    def get_queryset(self):
        return self.queryset.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new project"""
        return serializer.save(author=self.request.user)


class MyProfile(generics.RetrieveUpdateAPIView):
    """API View for user's profile"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.RegisterUserSerializer

    def get_object(self):
        return models.User.objects.filter(author=self.request.user)
