"""
URL Config for API app
"""
from django.urls import path, include
from api import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'api'

urlpatterns = [
    path('register', views.RegistrationAPIView.as_view()),
    path('token', views.ObtainTokenPairAPIView.as_view()),
    path('projects', views.ProjectAPIView.as_view(), name='project-list'),
    path('projects/<project_id>', views.ProjectDetailsAPIView.as_view(), name='project-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]