from django.contrib import admin

from django.contrib import admin
from .models import User, ChatMessage
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Extra', {'fields': ('birth_date', 'gender', 'country', 'profile_image')}),
    )

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('user','role','text','created_at')
