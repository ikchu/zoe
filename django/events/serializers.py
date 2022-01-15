from rest_framework import serializers
from events.models import Theme, Event
from users.serializers import UserSerializer

class ThemeSerializer(serializers.HyperlinkedModelSerializer):
    interested_users = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Theme
        fields = ['title','interested_users']
    
class EventSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.HyperlinkedRelatedField(view_name='customuser-detail',read_only=True, default=serializers.CurrentUserDefault())
    interested_users = UserSerializer(read_only=True, many=True)
    committed_users = UserSerializer(read_only=True, many=True)
    themes = ThemeSerializer(read_only=True, many=True)
    class Meta:
        model = Event
        fields = ['title', 'desc', 'creator', 'date_created', 'themes', 'long', 
                  'lat', 'interested_users', 'committed_users', 'date_occurring',
                  'capacity', 'price', 'is_recurring', 'recurring_duration',
                  'is_public', 'image']
        # the creator should be added automatically through viewset method
        # long and lat coordinates will have to be sorted out later
        read_only_fields = ['long', 'lat']
    
    def validate_is_public(self, value):
        """
        Ensures that user is allowed to set is_public field to True
        """
        if not self.context['request'].user.is_superuser and value:
            raise serializers.ValidationError("You are not allowed to create public events")
        return value
    def save(self, **kwargs):
        kwargs['creator'] = self.context['request'].user
        return super().save(**kwargs)