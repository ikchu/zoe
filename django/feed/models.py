import os
from pathlib import Path
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

BASE_DIR = Path(__file__).resolve().parent.parent

# Create your models here.
class Post(models.Model):
    description = models.CharField(max_length=255, blank=True)
    pic = models.ImageField(upload_to='images')
    date_posted = models.DateTimeField(default=timezone.now)
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    # maybe we don't want to have tags? either you know the user or you dont... no stalking
    tags = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.description

    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'pk': self.pk})

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='details', on_delete=models.CASCADE)
    username = models.ForeignKey(User, related_name='details', on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
    comment_date = models.DateTimeField(default=timezone.now)
