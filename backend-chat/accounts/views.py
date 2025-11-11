from django.shortcuts import render

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import User, ChatMessage
from .serializers import RegisterSerializer, UserSerializer, ChangePasswordSerializer, ChatMessageSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

# Simple register endpoint
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Profile read/update
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # para profile_image

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

# Change password
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        u = request.user
        # (opcional) validar old password si lo mandan
        old = serializer.validated_data.get('old_password')
        if old and not u.check_password(old):
            return Response({"detail":"Contraseña antigua incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
        u.set_password(serializer.validated_data['new_password'])
        u.save()
        return Response({"detail":"Contraseña actualizada"})

# Delete account
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"detail":"Cuenta eliminada"}, status=status.HTTP_204_NO_CONTENT)

# Chat history endpoints
class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChatMessage.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ClearChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ChatMessage.objects.filter(user=request.user).delete()
        return Response({"detail":"Historial eliminado"}, status=status.HTTP_200_OK)
