"""
Django REST views for REST API

NOTES: I use both View and ViewSet from DjangoREST
ViewSet is cleaner and more abstract, but not sufficient in some cases.
View is used when you need a custom queryset that you can't get through
an objects.filter() query (for ex. when you need current user's friends)

For more information on ViewSet, see
https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers

For more information on View, see
https://www.django-rest-framework.org/tutorial/3-class-based-views
"""

from django.contrib.auth.models import User, Group
from users.serializers import UserSerializer, GroupSerializer, ProfileSerializer
from rest_framework import viewsets, permissions, status, generics

# for more on ViewSet, see Django REST Tutorial 6
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# for more on View, see Django REST Tutorial 3
class FriendList(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.request.user.profile
        friends = user.friends.all()
        return friends