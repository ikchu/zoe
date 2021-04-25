from friendship.models import Friend
from rest_framework import serializers

class FriendshipSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Friend
        fields = ['url', 'to_user', 'from_user', 'created']