"""
Django REST views for REST API

NOTES: I use both View and ViewSet from DjangoREST
ViewSet is cleaner and more abstract, but not sufficient in some cases.
View is used when you need a custom queryset that you can't get through
an objects.filter() query (for ex. when you need current user's friends)

For more information on ViewSet, see
https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers

For more information on View, see
https://www.django-rest-framework.org/tutorial/3-class-based-views
"""

from django.contrib.auth.models import User, Group
from django.db.models import Q
from messenger.models import Message, Conversation
from messenger.serializers import MessageSerializer, ConversationSerializer
from rest_framework import viewsets, permissions, status, generics

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    # only show messages that are in this user's conversations
    def get_queryset(self):
        return Message.objects.filter(conversation__in=self.request.user.conversations.all()).order_by('-timestamp')

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer

    # only show this user's conversations
    def get_queryset(self):
        return self.request.user.conversations