from django.db import models
from django.conf import settings

class Theme(models.Model):
    title = models.CharField(max_length=150)
    interested_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='interests')

class Event(models.Model):
    title = models.CharField(max_length=150)
    desc = models.TextField(blank=True, default='')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_events')
    date_created = models.DateTimeField(auto_now_add=True)
    themes = models.ManyToManyField(Theme, blank=True)
    
    # will be used for location based requests
    long = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    lat = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    
    # marks users that actively selected the event
    interested_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='interested_events', blank=True)
    committed_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='committed_events', blank=True)
    
    date_occurring = models.DateTimeField(blank=True, null=True)
    
    capacity = models.IntegerField(blank=True, default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2, blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    recurring_duration = models.DurationField(blank=True, null=True)
    
    # requires certain permissions to make their events visible to everyone
    is_public = models.BooleanField(default=False)
    
    image = models.ImageField(upload_to='event_pics', default='default.png')
        