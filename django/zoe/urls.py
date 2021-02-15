"""zoe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from users import views as user_views
from feed import views as feed_views
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'users', user_views.UserViewSet)
# router.register(r'groups', user_views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/<slug>/', user_views.profile_view, name='profile_view'),
    path('friends/', user_views.friend_list, name='friend_list'),
    path('add-users/', user_views.add_users, name='add_users'),
    path('users/friend-request/accept/<int:id>/', user_views.accept_friend_request, name='accept_friend_request'),
    path('users/friend-request/delete/<int:id>/', user_views.delete_friend_request, name='delete_friend_request'),
    path('users/friend/delete/<int:id>/', user_views.delete_friend, name='delete_friend'),
    path('edit-profile/', user_views.edit_profile, name='edit_profile'),
    path('my-profile/', user_views.my_profile, name='my_profile'),
    path('register/', user_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/request_password_reset.html'), name='password_reset'),
    path('password-reset-done/', auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'), name='password_reset_complete'),

    path('', feed_views.PostListView.as_view(), name='home'),
    path('post/new/', feed_views.create_post, name='post-create'),
    path('post/<int:pk>/', feed_views.post_detail, name='post-detail'),
    path('post/<int:pk>/update/', feed_views.PostUpdateView.as_view(), name='post-update'),
    path('post/<int:pk>/delete/', feed_views.post_delete, name='post-delete'),
    path('user-posts/<str:username>', feed_views.UserPostListView.as_view(), name='user-posts')

    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
