from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)
import uuid
from django.conf import settings
from django.utils.text import slugify


class UserManager(BaseUserManager):
    """Manager for user creation"""

    def create_user(self, email, password, **extra_fields):
        """Validate, Create, Store and Return New User"""
        if not email:
            raise ValueError('The Email Field Must Be Set')
        
        # nomalize email
        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        # hash password
        user.set_password(password)
        user.save(using=self._db)

        # return new user
        return user

    def create_superuser(self, email, password):
        """"Validate, Create and store superuser"""
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system"""
    id = models.UUIDField(default=uuid.uuid4, unique=True,
          primary_key=True, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=20, null=True, blank=True)
    specialization = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        """returns object as str"""
        return self.email

    def projects(self):
        """Returns the number of projects by a user"""
        return Project.objects.get(author=self)


class Category(models.Model):
    """Model for creating category"""

    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    icon = models.FileField(upload_to='images/', default='/images/default.png', 
                            null=True, blank=True)
    
    def __str__(self):
        """Representation"""
        return self.title
        
    def save(self, *args, **kwargs):
        """overriding save method to auto upate slug field"""
        if self.slug == '' or self.slug is None:
            self.slug = slugify(self.title.lower())
        return super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Categories'


class Project(models.Model):
    """Model for projects"""
    
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)
    co_authors = models.CharField(max_length=255, blank=True, null=True)
    table_of_content = models.FileField('table-of-contents/', blank=True, null=True)
    project_content = models.FileField('project-content/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        """Representation"""
        return self.title
    
    def save(self, *args, **kwargs):
        """overriding save method to auto upate slug field"""
        if self.slug == '' or self.slug is None:
            self.slug = slugify(self.title.lower())
        return super(Project, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Projects'


class Softwares(models.Model):
    """Models for software"""

    title = models.CharField(max_length=255)
    slug = models.SlugField(null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField('source-codes/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        """Representation"""
        return self.title
    
    def save(self, *args, **kwargs):
        """overriding save method to auto upate slug field"""
        if self.slug == '' or self.slug is None:
            self.slug = slugify(self.title.lower())
        return super(Softwares, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Softwares'


class Payments(models.Model):
    """Model for payments"""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    # item = models.ForeignKey(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=(
        ('Pending', 'Pending'),
        ('Declined', 'Declined'),
        ('Approved', 'Approved'),
        ))
    payment_reference = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.user
    
    class Meta:
        verbose_name_plural = 'Payments'

    
class Notification(models.Model):
    """Model for Notifications"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=25, null=True, blank=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.user
    
    class Meta:
        verbose_name_plural = 'Notifications'




