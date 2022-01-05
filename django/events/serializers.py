from rest_framework import serializers
from events.models import Theme, Event
from users.serializers import UserSerializer

class ThemeSerializer(serializers.HyperlinkedModelSerializer):
    interested_users = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Theme
        fields = ['title','interested_users']
    
class EventSerializer(serializers.HyperlinkedModelSerializer):
    interested_users = UserSerializer(read_only=True, many=True)
    committed_users = UserSerializer(read_only=True, many=True)
    themes = ThemeSerializer(read_only=True, many=True)
    class Meta:
        model = Event
        fields = ['title', 'desc', 'creator', 'date_created', 'themes', 'long', 
                  'lat', 'interested_users', 'committed_users', 'date_occurring',
                  'capacity', 'price', 'is_recurring', 'recurring_duration',
                  'visibility', 'image']
        # the creator should be added automatically through viewset method
        # long and lat coordinates will have to be sorted out later
        read_only_fields = ['creator', 'long', 'lat']
