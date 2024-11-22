from django.contrib import admin
from core import models

# Register your models here.
admin.site.register(models.Category)
admin.site.register(models.User)
admin.site.register(models.Project)