from django.contrib.auth import get_user_model
from django.db.models import Q
from users.models import Profile
from users.permissions import UserPermission, ProfilePermission
from friendship.models import Friend
from users.serializers import UserSerializer, ProfileSerializer
from rest_framework import viewsets, permissions, status, generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all users that are friends
    with the currently authenticated user
    """
    permission_classes = [UserPermission]
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        This probably isn't the most efficient way to do this, since values_list()
        already internally gets the queryset of User friends, then converts it to a
        queryset of pks and returns those, which I later convert back into Users...
        Is there a way to have values_list return a queryset of models?
        Is there some other method besides values_list() that I missed? Custom SQL?
        Also, is "| Q(pk=user.pk)" really the best way to add the user to the queryset???
        """
        user = self.request.user
        friendships = Friend.objects.filter(to_user=user).values_list('from_user', flat=True)
        return get_user_model().objects.filter(Q(pk__in=friendships) | Q(pk=user.pk))

    def create(self, request, *args, **kwargs):
        """
        This function overrides rest_framework.mixins.CreateModelMixin.create.
        Now, create token here so that the it can be returned in the response.
        Also extract the hyperlink field from the user object and return in the response.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        return Response({**serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)

class ProfileViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all profiles of users that are
    friends with the currently authenticated user
    """
    permission_classes = [ProfilePermission]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.request.user
        friendships = Friend.objects.filter(to_user=user).values_list('from_user', flat=True)
        return Profile.objects.filter(Q(pk__in=friendships) | Q(pk=user.pk))
        # return Profile.objects.filter(user__in=friends)

class LoginUserAPIView(ObtainAuthToken):
    """
    Overriding ObtainAuthToken.post to modify login behavior.
    Added a line which extracts the hyperlink field from the user object,
    which I then return in the response. 
    """
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user_hyperlink = UserSerializer(user, context={'request': request}).data['url']
        return Response({'token': token.key, 'user': user_hyperlink})

class LogoutUserAPIView(APIView):
    """
    TODO: consider refactoring this into a TokenViewSet. login would map to CREATE. logout would map to DELETE.
    register could call the UserViewSet.create method which could then redirect to CREATE here???
    that would also mean we wouldn't have to do all that copying in UserViewSet.create - we could
    just call super.create(), then redirect here where we create a token and return a Response??
    """
    queryset = get_user_model().objects.all()
    
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

    permission_classes = [permissions.IsAuthenticated]

class AuthUserViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all registered users.
    For admin use only
    """
    permission_classes = [permissions.IsAdminUser]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class AuthProfileViewSet(viewsets.ModelViewSet):
    """
    This viewset should contain all user profiles.
    For admin use only
    """
    permission_classes = [permissions.IsAdminUser]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer