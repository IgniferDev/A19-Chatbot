
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

GENDER_CHOICES = [
    ('male', 'Masculino'),
    ('female', 'Femenino'),
    ('other', 'Otro(s)'),
    ('notsay', 'Prefiero no decir'),
]

class User(AbstractUser):
    # User hereda username, first_name, last_name, email, password...
    # Hacemos email único y añadimos campos extras.
    email = models.EmailField('email address', unique=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='notsay')
    country = models.CharField(max_length=100, blank=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # aún necesita username para compatibilidad

    def __str__(self):
        return f"{self.email}"


class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats')
    role = models.CharField(max_length=10, choices=(('user','user'),('bot','bot')))
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
