from django.contrib import admin
from events.models import Event, Theme

# Register your models here.
admin.site.register(Event)
admin.site.register(Theme)