from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)
import uuid
from django.conf import settings
from django.utils.text import slugify

from django.db.models.signals import post_save
from django.dispatch import receiver



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
    referal_name = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    is_author = models.BooleanField(default=False)
    
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
    
    def project_count(self):
        """returns the number of projects in a category"""
        return Project.objects.filter(category=self).count()  
          
    def save(self, *args, **kwargs):
        """overriding save method to auto upate slug field"""
        if self.slug == '' or self.slug is None:
            self.slug = slugify(self.title.lower())
        return super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Categories'


class Project(models.Model):
    """Model for projects"""
    
    STATUS_CHOICE = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
    )
    LEVEL_CHOICE = (
        ('NCE', 'NCE'),
        ('ND', 'ND'),
        ('HND', 'HND'),
        ('Bsc', 'Bsc'),
        ('PGD', 'PGD'),
        ('Msc', 'Msc'),
        ('PhD', 'PhD'),
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)
    co_authors = models.CharField(max_length=255, blank=True, null=True)
    table_of_content = models.FileField('table-of-contents', blank=True, null=True)
    project_content = models.FileField('project-content', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    level = models.CharField(max_length=50, choices=LEVEL_CHOICE, null=True, blank=True)
    status = models.CharField(max_length=50, blank=True, null=True, choices=STATUS_CHOICE)
    like = models.ManyToManyField(User, blank=True, related_name='project_likes')
    views = models.IntegerField(default=0, blank=True, null=True)
    dislikes = models.ManyToManyField(User, blank=True,
                                    related_name='project_dislikes')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, choices=(
        ('Approved', ('Approved')),
        ('Pending', ('Pending')),
        ('Declined', ('Declined')),
    ), default='Pending')

    

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

    STATUS_CHOICE = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
    )

    LEVEL_CHOICE = (
        ('NCE', 'NCE'),
        ('ND', 'ND'),
        ('HND', 'HND'),
        ('BSC', 'BSC'),
        ('PGD', 'PGD'),
        ('MSC', 'MSC'),
        ('PHD', 'PHD'),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField('source-codes/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=50, blank=True, null=True, choices=STATUS_CHOICE)
    like = models.ManyToManyField(User, blank=True, related_name='software_likes')
    views = models.IntegerField(default=0, blank=True, null=True)
    level = models.CharField(max_length=50, choices=LEVEL_CHOICE, null=True, blank=True)
    dislikes = models.ManyToManyField(User, blank=True, related_name='software_dislikes')

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

    email = models.EmailField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    item = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=True)
    date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=(
        ('Pending', 'Pending'),
        ('Declined', 'Declined'),
        ('Approved', 'Approved'),
        ))
    payment_reference = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f'{self.user} - {self.status}'
    
    class Meta:
        verbose_name_plural = 'Payments'

    
class Notification(models.Model):
    """Model for Notifications"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=25, null=True, blank=True)
    status = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True,
                                null=True)

    def __str__(self):
        return f'{self.user} - {self.action} - {self.project}'
    
    class Meta:
        verbose_name_plural = 'Notifications'


class UsersWallet(models.Model):
    """Model for Creating Users Wallet"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    account_name = models.CharField(max_length=50, null=True, blank=True)
    account_number = models.IntegerField(default=0.0)
    bank = models.CharField(max_length=50, null=True, blank=True)
    balance = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)

    def __str__(self):
        return f'{self.user} - {self.account_name}'

    class Meta:
        verbose_name_plural = 'UsersWallet'


class CashOut(models.Model):
    """Model for cash out"""

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=(
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
    ), default=True)


    def update(self, *args, **kwargs):
        """Override update method"""
        if self.status == 'Approved':
            Transaction.objects.create(
                user=self.user,
                description="Cashout",
                amount=self.amount
            )
                
    def __str__(self):
        return f'{self.user} Requested to Withdraw N{self.amount}. ({self.status})'

    class Meta:
        verbose_name_plural = 'Cashouts'


class FAQ(models.Model):
    """Model for frequently asked questions"""
    question = models.TextField()
    answer = models.TextField()
    created_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.question}'
    
    class Meta:
        verbose_name_plural = 'FAQs'


class Blog(models.Model):
    """Model for blogs"""

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts_author')
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, blank=True, related_name='posts_likes')
    views = models.IntegerField(default=0)
    hashtags = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        """Returns string representation"""
        return f'{self.title } by {self.author}'
    
    class Meta:
        verbose_name_plural = 'Blogs'


class Hire(models.Model):
    """Model for hiring a professional"""

    client = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    subject = models.CharField(max_length=255)
    description = models.TextField()
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=15)
    date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        """Override the save method to make some changes"""
        if self.client:
            self.name = self.client.name
            self.email = self.client.email
            self.contact = self.client.contact
        return super(Hire, self).save(*args, **kwargs)

    def __str__(self):
        """Returns string representation"""
        return f'{self.subject }'
    
    class Meta:
        verbose_name_plural = 'Hire'


class Transaction(models.Model):
    """Model for transactions (purchase and Cashouts)"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f'{self.description} - {self.amount}'

    class Meta:
        verbose_name_plural = 'Transactions'



@receiver(post_save, sender=CashOut)
def create_transaction_on_cashout_approved(sender, instance, created, **kwargs):
    if not created and instance.status == 'Approved':
        if not hasattr(instance, 'transaction'):
            Transaction.objects.create(
                user=instance.user,
                description="Cashout",
                amount=instance.amount
            )