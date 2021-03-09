from django.db import models
from django.conf import settings

class Message(models.Model):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_to_user', on_delete=models.CASCADE)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_from_user', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=1000)