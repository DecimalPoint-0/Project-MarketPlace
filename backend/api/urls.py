"""
URL Config for API app
"""
from django.urls import path, include
from api import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'api'

urlpatterns = [
    
    # authentication urls
    path('register', views.RegistrationAPIView.as_view()),
    path('token', views.ObtainTokenPairAPIView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

     # url related urls
    path('projects', views.ProjectAPIView.as_view(), name='project-list'),
    path('projects/<id>', views.ProjectDetailsAPIView.as_view(), 
                                        name='project-detail'),
    path('projects/<id>/like', views.LikeProject.as_view(), 
                                        name='like'),
    path('projects/<id>/dislikes', views.DislikeProject.as_view(), 
                                        name='dislike'),
    path('projects/<id>/initiatepayment', views.InitiatePaymentAPIView.as_view(), 
                                        name='initiatepayment'),
    path('projects/verifypayment/<id>', views.VerifyPaymentAPIView.as_view(), 
                                        name='verifypayment'),

    path('authors/', views.AuthorsAPIView.as_view(), name='authors'),
    path('authors/<email>', views.AuthorDetailsAPIView.as_view(), 
                                        name='author-details'),
         
    path('categories/', views.Categories.as_view(), name='cateogries'),
    path('categories/<id>/projects', views.ProjectCategories.as_view(), 
                                        name='cat_projects'),
]