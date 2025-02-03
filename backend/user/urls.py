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
    path('me', views.MyProfileAPIView.as_view(), name='project'),
    path('approved', views.ApprovedProjectsAPIView.as_view()),
    path('pending', views.PendingProjectAPIView.as_view()),
    path('declined', views.DeclinedProjectsAPIView.as_view()),
    path('notifications', views.NotificationAPIView.as_view()),
    path('notification/<noti_id>/seen', views.NotificationSeenAPIView.as_view()),
    path('stats', views.UserStatsAPIView.as_view()),
    path('wallet', views.MyAccountAPIView.as_view()),
    path('cashout', views.CashOutAPIView.as_view()),
    path('transactions', views.TransactionsAPIView.as_view()),
]
