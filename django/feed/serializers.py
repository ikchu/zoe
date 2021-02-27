from feed.models import Post
from rest_framework import serializers
from users.serializers import UserSerializer

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'