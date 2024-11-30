"""
URL Config for User app
"""
from django.urls import path, include
from user import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('project', views.UserProjectAPIView)

urlpatterns = [
    path('', include(router.urls), name='project'),
]
