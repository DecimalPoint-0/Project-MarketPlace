from django.contrib import admin
from core import models

# Register your models here.
admin.site.register(models.Category)
admin.site.register(models.User)
admin.site.register(models.Project)
admin.site.register(models.Notification)
admin.site.register(models.UsersWallet)
admin.site.register(models.CashOut)
admin.site.register(models.Payments)