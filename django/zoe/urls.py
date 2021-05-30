from django.contrib import admin
from django.urls import include, path
from django.contrib.auth import views as auth_views

from users import rest_views as user_rest_views
from feed import views as feed_views
from feed import rest_views as feed_rest_views
from messenger import views as messenger_views
from messenger import rest_views as messenger_rest_views
from friendship import rest_views as friendship_rest_views

from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken

router = routers.DefaultRouter()
router.register(r'users', user_rest_views.UserViewSet, basename='customuser')
router.register(r'profiles', user_rest_views.ProfileViewSet, basename='profile')
router.register(r'posts', feed_rest_views.PostViewSet, basename='post')
router.register(r'messages', messenger_rest_views.MessageViewSet, basename='message')
router.register(r'conversations', messenger_rest_views.ConversationViewSet, basename='conversation')
router.register(r'friendships', friendship_rest_views.FriendshipViewSet, basename='friend')

other_rest_urls = [
    # path('login/', ObtainAuthToken.as_view(), name='user_login'),
    path('login/', user_rest_views.LoginUserAPIView.as_view(), name='user_login'),
    path('logout/', user_rest_views.LogoutUserAPIView.as_view(), name='user_logout'),
]

authrouter = routers.DefaultRouter()
authrouter.register(r'users', user_rest_views.AuthUserViewSet)
authrouter.register(r'profiles', user_rest_views.AuthProfileViewSet)
authrouter.register(r'messages', messenger_rest_views.AuthMessageViewSet)
authrouter.register(r'conversations', messenger_rest_views.AuthConversationViewSet)

auth_rest_urls = [
    path('', include('rest_framework.urls',namespace='rest_framework')),
    path('', include(authrouter.urls)),
]

"""
Because the auth routers and the regular routers use the same models, their URLs end
up having the same names (ex. customuser-detail, message-list, etc.). This is problematic
because we won't know which URL an object's url field will end up point to.
I found a hack: by adding auth urls above regular urls in the urlpatterns, the objects will
use the regular URL for their url field (desired). 
Maybe the root problem can be fixed by changing basenames? I need to investigate...
"""
rest_urls = [
    path('auth/', include(auth_rest_urls)), 
    path('', include(router.urls)),
    path('', include(other_rest_urls)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/request_password_reset.html'), name='password_reset'),
    path('password-reset-done/', auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'), name='password_reset_complete'),

    # NOTE: I had to change all these names below to use _ instead of - because some (ex. post-detail) were clashing
    # with the API urls that were auto-generated by the REST router
    path('', feed_views.PostListView.as_view(), name='home'),
    path('post/new/', feed_views.create_post, name='post_create'),
    path('post/<int:pk>/', feed_views.post_detail, name='post_detail'),
    path('post/<int:pk>/update/', feed_views.PostUpdateView.as_view(), name='post_update'),
    path('post/<int:pk>/delete/', feed_views.post_delete, name='post_delete'),
    path('user-posts/<str:username>', feed_views.UserPostListView.as_view(), name='user_posts'),

    path('messenger/', messenger_views.MessageListView.as_view(), name='messenger'),

    path('api/', include(rest_urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
