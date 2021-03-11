from feed.models import Post
from rest_framework import serializers
from users.serializers import UserSerializer

from users.serializers import UserSerializer

class PostSerializer(serializers.HyperlinkedModelSerializer):
    # this line allows us to have a nested representation!
    # this way, instead of the post api just showing the user's hyperlink,
    # it will show the entire serialized user (including the username that we want)
    user = UserSerializer()

    class Meta:
        model = Post
        # fields = '__all__'
        fields = ['url', 'id', 'description', 'pic', 'date_posted', 'tags', 'user']