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

from django.db.models import Q
from messenger.models import Message, Conversation
from messenger.serializers import MessageSerializer, ConversationSerializer
from messenger.permissions import MessagePermission
from rest_framework import viewsets, permissions, status, generics

class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, MessagePermission]
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        This view should return a list of all the messages to or from
        the currently authenticated user, including those from group 
        conversations which the user is a member of.
        """
        user = self.request.user
        return Message.objects.filter(conversation__in=user.conversations.all()).order_by('-timestamp')

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the conversations that
        include the currently authenticated user
        """
        return self.request.user.conversations

class AuthMessageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class AuthConversationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ConversationSerializer
    queryset = Conversation.objects.all()