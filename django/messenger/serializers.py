from django.contrib.auth.models import User
from messenger.models import Message, Conversation
from rest_framework import serializers

class ConversationSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='conversation-detail')

    class Meta:
        model = Conversation
        fields = ['url', 'name', 'members', 'messages']

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='message-detail')

    class Meta:
        model = Message
        fields = ['url', 'conversation', 'sender', 'timestamp', 'message']