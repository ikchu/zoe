from friendship.models import Friend
from messenger.models import Message, Conversation
from rest_framework import serializers

class ConversationSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Conversation
        fields = ['url', 'name', 'members', 'messages']

    def validate_members(self, value):
        user = self.context['request'].user
        for member in value:
            if member != user and member not in Friend.objects.friends(user):
                raise serializers.ValidationError('You must be friends with all members of the conversation')
        return value

    # def create(self, validated_data):

class MessageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Message
        fields = ['url', 'conversation', 'sender', 'timestamp', 'message']

    def validate_conversation(self, value):
        """
        Users should only be allowed to send messages to conversations which
        that are members of
        """
        if value not in self.context['request'].user.conversations.all():
            raise serializers.ValidationError('You are not a part of this conversation')
        return value

    def create(self, validated_data):
        """
        Automatically set the message.sender field to the user making the request.
        This prevents a user from writing a message in another user's name
        """
        validated_data['sender'] = self.context['request'].user
        return Message.objects.create(**validated_data)