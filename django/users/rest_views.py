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
from users.serializers import UserSerializer, CreateUserSerializer, GroupSerializer, ProfileSerializer
from rest_framework import viewsets, permissions, status, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# for more on ViewSet, see Django REST Tutorial 6
# ViewSet to get all users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# ViewSet to get all groups
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# for more on View, see Django REST Tutorial 3
# View to get all friends of current user
class FriendList(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.request.user.profile
        friends = user.friends.all()
        return friends

class CreateUser(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {'token': token.key}
        return Response({**serializer.data, **token_data}, status=status.HTTP_201_CREATED, headers=headers)
        
class LogoutUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)