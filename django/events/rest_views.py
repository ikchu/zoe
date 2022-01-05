from rest_framework.generics import get_object_or_404
from events.models import Event, Theme
from events.serializers import EventSerializer, ThemeSerializer
from events.permissions import EventPermission
from friendship.models import Friend, Block
from django.db.models import Q
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, EventPermission]
    serializer_class = EventSerializer
    
    def get_queryset(self):
        """
        Retrieves all of friends created events, own created events, and public events
        """
        user = self.request.user
        friendships = Friend.objects.filter(to_user=user).values_list('from_user', flat=True)
        blocked = Block.objects.filter(blocked=user).values_list('blocker', flat=True)
        blocked_query = Q(visibility=True) & ~Q(creator__pk__in=blocked)
        return Event.objects.filter(Q(creator__pk__in=friendships) 
                                    | Q(creator__pk=user.pk) 
                                    | blocked_query).order_by('date_created')
    
    def perform_create(self, serializer):
        """ 
        Modified to request user as event creator and enforce visibility set checks
        """
        user = self.request.user
        # for now, only allow editing of visibility if user is superuser
        visibility_check = user.is_superuser and serializer.validated_data['visibility']
        serializer.save(creator=user, visibility=visibility_check)

    @action(detail=True, methods=['patch'])
    def join_event_interested(self):
        event = self.get_object()
        # could add additional validation (blocked users, friends, visibility)
        event.interested_users.add(self.request.user)
    
    @action(detail=True, methods=['patch'])
    def join_event_committed(self):
        event = self.get_object()
        event.committed_users.add(self.request.user)
        
class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    
    def get_queryset(self):
        """
        Returns all of the user's current themes
        """
        user = self.request.user
        return user.interests.all()
    
    @action(detail=True, methods=['patch'])
    def add_interest(self):
        theme = self.get_object()
        theme.interested_users.add(self.request.user)
    