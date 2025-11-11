# accounts/serializers.py
from rest_framework import serializers
from .models import User, ChatMessage
from django.contrib.auth.password_validation import validate_password
from datetime import datetime

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    birth_date = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'birth_date', 'gender', 'country', 'email', 'password', 'password2')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        validate_password(data['password'])
        return data

    def parse_birth(self, value):
        if not value:
            return None
        for fmt in ('%d%m%Y', '%d-%m-%Y', '%Y-%m-%d'):
            try:
                return datetime.strptime(value, fmt).date()
            except Exception:
                pass
        raise serializers.ValidationError("Formato de fecha inválido. Usa ddmmaaaa o YYYY-MM-DD.")

    def create(self, validated_data):
        validated_data.pop('password2', None)
        pwd = validated_data.pop('password')
        birth_raw = validated_data.pop('birth_date', None)
        birth = self.parse_birth(birth_raw) if birth_raw else None

        user = User(
            username=validated_data.get('username') or validated_data.get('email').split('@')[0],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            birth_date=birth,
            gender=validated_data.get('gender', 'notsay'),
            country=validated_data.get('country', '')
        )
        user.set_password(pwd)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','birth_date','gender','country','profile_image')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=False, allow_blank=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        validate_password(data['new_password'])
        return data

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ('id','role','text','created_at')
