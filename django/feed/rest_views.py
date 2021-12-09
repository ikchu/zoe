from feed.models import Post
from friendship.models import Friend
from django.db.models import Q
from feed.serializers import PostSerializer
from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        friendships = Friend.objects.filter(to_user=user).values_list('from_user', flat=True)
        return Post.objects.filter(Q(user__pk__in=friendships) | Q(user__pk=user.pk)).order_by('-date_posted')