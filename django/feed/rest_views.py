from feed.models import Post
from feed.serializers import PostSerializer
from rest_framework import viewsets, permissions, status, generics

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-date_posted')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]