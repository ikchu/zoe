from django.contrib.auth import get_user_model
from friendship.models import Friend
from friendship.serializers import FriendshipSerializer
from rest_framework import viewsets, permissions

class FriendshipViewSet(viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer

    def get_queryset(self):
        """
        This view should return a lsit of all the friends of
        the currently authenticated user
        """
        user = self.request.user
        return user.friends