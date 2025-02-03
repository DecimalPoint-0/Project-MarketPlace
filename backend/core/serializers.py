""""
API serializers
"""
from core import models
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Sum, Count

class RegisterUserSerializer(serializers.ModelSerializer):
    """Serializer class for user registration"""

    password = serializers.CharField(min_length=5, write_only=True)
    password2 = serializers.CharField(min_length=5, write_only=True)

    class Meta:
        model = models.User
        fields = ['email', 'name', 'password', 'password2', 'contact']
        
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
    

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""

    projects = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    def get_likes(self, obj) -> int:
        return models.Project.objects.filter(author=obj).annotate(
            likes_count=Count('like')).aggregate(total_likes=Sum('likes_count'))['total_likes'] or 0

    def get_projects(self, obj) -> int:
        return  models.Project.objects.filter(author=obj).count()


    class Meta:
        model = models.User
        fields = ['password', 'email', 'name', 'contact', 
                  'specialization', 'projects', 'likes']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'},
                'required': False
            },
            'email': {
                'read_only': True,
            }
        }
        
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
    project_count = serializers.IntegerField()

    class Meta:
        model = models.Category
        fields = ['id', 'title', 'description', 'project_count']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer calss for Project"""

    author_name = serializers.ReadOnlyField(source='author.name')
    category = serializers.ReadOnlyField(source='category.title')
    
    class Meta:
        model = models.Project
        fields = ['id', 'title', 'level',
                  'category','author_name', 'views', 'price', 'like'
                  ]


class ProjectDetailSerializer(ProjectSerializer):
    """Serializer for project details"""

    like = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    def get_like(self, obj) -> int:
        return obj.like.count()
    
    def get_dislikes(self, obj) -> int:
        return obj.dislikes.count()

    table_of_content = serializers.FileField()

    class Meta(ProjectSerializer.Meta):
        fields = list(ProjectSerializer.Meta.fields) + [
            'description', 'like', 'dislikes', 'table_of_content']


class ProjectUploadSerializer(serializers.ModelSerializer):
    """Serializer for uploading/updating projects (includes content field)"""

    class Meta:
        model = models.Project
        exclude = ['like', 'views', 'dislikes', 'status', 'slug']


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer class for Author"""

    class Meta:
        model = models.User
        fields = ['name', 'email', 'specialization']


class AuthorDetailsSerializer(AuthorSerializer):
    """Serializer class for details about authors"""

    projects = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()

    def get_like(self, obj) -> int:
        return models.Project.objects.filter(author=obj).annotate(
            likes_count=Count('like')).aggregate(total_likes=Sum('likes_count'))['total_likes'] or 0

    def get_projects(self, obj) -> int:
        return  models.Project.objects.filter(author=obj).count()

    class Meta(AuthorSerializer.Meta):
        fields = list(AuthorSerializer.Meta.fields) + ['projects', 'like']


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer class for notifications"""

    user = serializers.CharField(source='user.name')
    project_name = serializers.CharField(source='project.title')

    class Meta:
        model = models.Notification
        fields = ['action', 'user', 'project', 'project_name']


class AccountSerializer(serializers.ModelSerializer):
    """Serializer class for user account"""

    class Meta:
        model = models.UsersWallet
        fields = ['account_name', 'account_number', 'bank', 'balance']

        extra_kwargs = {
            'balance': {
                'read_only': True,
            },
        }


class FAQSerializer(serializers.ModelSerializer):
    """Serializer class for frequently asked questions"""

    class Meta:
        model = models.FAQ
        fields = '__all__'

        extra_kwargs = {
            'created_at': {
                'read_only': True,
            },
        }


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer class for transactions"""

    class Meta:
        model = models.Transaction
        exclude = ['id']
    
