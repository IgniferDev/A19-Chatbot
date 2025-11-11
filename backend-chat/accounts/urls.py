from django.urls import path
from .views import RegisterView, ProfileView, ChangePasswordView, DeleteAccountView, ChatListCreateView, ClearChatHistoryView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import UserSerializer
from .views import ProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),

    path('chats/', ChatListCreateView.as_view(), name='chats'),
    path('chats/clear/', ClearChatHistoryView.as_view(), name='chats_clear'),
]
