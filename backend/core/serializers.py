""""
API serializers
"""
from core import models
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterUserSerializer(serializers.ModelSerializer):
    """Serializer class for user registration"""

    password = serializers.CharField(min_length=5, write_only=True)
    password2 = serializers.CharField(min_length=5, write_only=True)

    class Meta:
        model = models.User
        fields = ['email', 'name', 'password', 'password2', 'contact',
                  'specialization']
        
    def validate(self, attrs):
        """Validate password and confirm password fields"""
        if attrs['password2'] != attrs['password']:
            raise serializers.ValidationError({'Password': "Password field mismatch"})
        
        return attrs
    
    def create(self, validated_data):
        """Create and return user instance"""
        user = models.User.objects.create(
            email = validated_data['email'],
            name = validated_data['name'],
            contact = validated_data['contact'],
            specialization = validated_data['specialization']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        """Update and return user"""

        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT token serializer"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['name'] = user.name

        return token
    
class CategorySerializer(serializers.ModelSerializer):
    """Serializer for category"""
    
    class Meta:
        model = models.Category
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer calss for Project"""

    table_of_content = serializers.FileField()
    project_content = serializers.FileField()
    
    class Meta:
        model = models.Project
        fields = ['title', 'description', 'keywords', 'co_authors',
                  'category', 'table_of_content', 'category', 'project_content']


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer class for listing authors"""

    class Meta:
        model = models.User
        fields = ['name', 'email', 'contact', 'specialization']