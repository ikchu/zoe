from django.conf import settings
from django.db import models
from django.utils import timezone

class Conversation(models.Model):
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='conversations')
    name = models.CharField(max_length=50)
    read = models.BooleanField(default=False)

class Message(models.Model):
    """
    The sender field is automatically set (in MessageSerializer) to the user making the POST request
    The timestamp field is automatically set to the time of the POST request
    """
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, editable=False, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now, editable=False)
    message = models.CharField(max_length=1000)