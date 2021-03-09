from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Message

class MessageListView(LoginRequiredMixin, ListView):
    model = Message
    template_name = 'messenger/all_messages.html'
    context_object_name = 'messages'
    ordering = ['-timestamp']

def draft_message(request):
    pass

def send_message(request):
    pass

def delete_message(request):
    pass