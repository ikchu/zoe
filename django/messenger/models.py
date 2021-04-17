from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Conversation(models.Model):
    members = models.ManyToManyField(User, related_name='conversations')
    name = models.CharField(max_length=50)
    read = models.BooleanField(default=False)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    message = models.CharField(max_length=1000)