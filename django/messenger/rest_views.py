from django.db.models import Q
from messenger.models import Message, Conversation
from messenger.serializers import MessageSerializer, ConversationSerializer
from messenger.permissions import MessagePermission
from rest_framework import viewsets, permissions, status, generics

class MessageViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all messages to or from
    the currently authenticated user, including those from group 
    conversations which the user is a member of
    """
    permission_classes = [permissions.IsAuthenticated, MessagePermission]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(conversation__in=user.conversations.all()).order_by('-timestamp')

class ConversationViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all conversations that include
    the currently authenticated user
    """
    serializer_class = ConversationSerializer

    def get_queryset(self):
        return self.request.user.conversations

class AuthMessageViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all messages ever sent.
    For admin use only
    """
    permission_classes = [permissions.IsAdminUser]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class AuthConversationViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all conversations ever created.
    For admin use only
    """
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ConversationSerializer
    queryset = Conversation.objects.all()