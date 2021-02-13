from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.conf import settings
from django.http import HttpResponseRedirect
from feed.models import Post
from .models import Profile, FriendRequest
from .forms import UserRegistrationForm, UserUpdateForm, ProfileUpdateForm
import random

# Create your views here.
User = get_user_model()

@login_required
def users_list(request):
    users = Profile.objects.exclude(user=request.user)
    sent_friend_requests = FriendRequest.objects.filter(from_user=request.user)
    sent_to = []
    friends = []
    # add all users on the entire site to friends
    # NOTE: I don't understand why we need to go through each user and add their friends
    # wouldnt the 'users' var already above already contain every user on the site?
    # if that's the case, then the below loop is kinda useles and we could just do friends = users
    for user in users:
        user_friends = user.friends.all()
        # filter out duplicates
        for friend in user_friends:
            if friend in friends:
                user_friends = user_friends.exclude(user=friend.user)
        friends += user_friends
    my_friends = request.user.profile.friends.all()
    # if any of this user's friends are in friends, remove them
    for friend in my_friends:
        if friend in friends:
            friends.remove(friend)
    # if this user himself is in friends, remove him
    if request.user.profile in friends:
        friends.remove(request.user.profile)
    # select 10 random users from the list (if > 10 users exist)
    random_list = random.sample(list(users), min(len(list(users)), 10))
    for random_user in random_list:
        if random_user in friends:
            random_list.remove(random_user)
    friends += random_list
    for friend in my_friends:
        if friend in friends:
            friends.remove(friend)
    for sent_request in sent_friend_requests:
        sent_to.append(sent_request.to_user)
    context = {
            'users': friends,
            'sent': sent_to
    }
    return render(request, 'users/users_list.html', context)

# NOTE: why is login not required for this one?
def friend_list(request):
    user = request.user.profile
    friends = user.friends.all()
    context = {
            'friends': friends,
    }
    return render(request, 'users/friend_list.html', context)

@login_required
def send_friend_request(request, id):
    user = get_object_or_404(User, id=id)
    friend_request, created = FriendRequest.objects.get_or_create(from_user=request.user, to_user=user)
    return HttpResponseRedirect(f'/users/{user.profile.slug}')

@login_required
def cancel_friend_request(request, id):
    user = get_object_or_404(User, id=id)
    friend_request = FriendRequest.objects.filter(from_user=request.user, to_user=user).first()
    friend_request.delete()
    return HttpResponseRedirect(f'/users/{user.profile.slug}')

@login_required
def accept_friend_request(request, id):
    from_user = get_object_or_404(User, id=id)
    # NOTE: instead of using filter().first() from here on, could we use get()?? might be cleaner
    friend_request = FriendRequest.objects.filter(from_user=from_user, to_user=request.user).first()
    user1 = friend_request.to_user
    user2 = from_user
    user1.profile.friends.add(user2.profile)
    user2.profile.friends.add(user1.profile)
    # if user1 also had a pending friend request to user2, delete it
    # later we probably shouldn't let it be possible to have friend pending requests in both directions
    # NOTE: it seems like this would query twice. is there a way to rewrite this code to be less repetitive?
    if (FriendRequest.objects.filter(from_user=request.user, to_user=from_user).first()):
        opposite_request = FriendRequest.objects.filter(from_user=request.user, to_user=from_user).first()
        opposite_request.delete()
    friend_request.delete()
    return HttpResponseRedirect(f'/users/{request.user.profile.slug}')

@login_required
def delete_friend_request(request, id):
    from_user = get_object_or_404(User, id=id)
    friend_request = FriendRequest.objects.filter(from_user=from_user, to_user=request.user).first()
    friend_request.delete()
    return HttpResponseRedirect(f'/users/{request.user.profile.slug}')

@login_required
def delete_friend(request, id):
    profile = request.user.profile
    friend_profile = get_object_or_404(Profile, id=id)
    profile.friends.remove(friend_profile)
    friend_profile.friends.remove(profile)
    return HttpResponseRedirect(f'/users/{friend_profile.slug}')

@login_required
def profile_view(request, slug):
    # Note: any user could call this function to look up any other user...
    # So, although we set these vars here, we will need to check later whether
    # we should actually show these to the user who is making the request
    profile = Profile.objects.filter(slug=slug).first()
    user = profile.user
    sent_friend_requests = FriendRequest.objects.filter(from_user=user)
    received_friend_requests = FriendRequest.objects.filter(to_user=user)
    user_posts = Post.objects.filter(user_name=user)
    friends = profile.friends.all()
    button_status = 'none'
    # if this user is not our friend
    if profile not in request.user.profile.friends.all():
        button_status = 'not_friend'
        # if we've sent this user a friend request
        if len(received_friend_requests.filter(from_user=request.user)) == 1:
            button_status = 'friend_request_sent'
        # if this user has sent us a friend request
        if len(sent_friend_requests.filter(to_user=request.user)) == 1:
            button_status = 'friend_request_received'
    context = {
            'user': user,
            'button_status': button_status,
            'friends_list': friends,
            'sent_friend_requests': sent_friend_requests,
            'received_friend_requests': received_friend_requests,
            'post_count': user_posts.count
    }
    return render(request, 'users/profile.html', context)

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You can now login.')
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'users/register.html', {'form':form})

@login_required
def edit_profile(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('my_profile')
    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
            'user_form': user_form,
            'profile_form': profile_form
    }
    return render(request, 'users/edit_profile.html', context)

@login_required
def my_profile(request):
    user = request.user
    profile = request.user.profile
    sent_friend_requests = FriendRequest.objects.filter(from_user=user)
    received_friend_requests = FriendRequest.objects.filter(to_user=user)
    user_posts = Post.objects.filter(user_name=user)
    friends = profile.friends.all()
    context = {
            'user': user,
            'friends_list': friends,
            'sent_friend_requests': sent_friend_requests,
            'received_friend_requests': received_friend_requests,
            'post_count': user_posts.count
    }
    return render(request, 'users/profile.html', context)

@login_required
def search_users(request):
    query = request.GET.get('q')
    object_list = User.objects.filter(username__icontains=query)
    context = {
            'users': object_list
    }
    return render(request, 'users/search_users.html', context)

# from django.contrib.auth.models import User, Group
# from rest_framework import viewsets
# from rest_framework import permissions
# from users.serializers import UserSerializer, GroupSerializer
# 
# class UserViewSet(viewsets.ModelViewSet):
#     # API endpoint that allows users to be viewed or edited.
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]
# 
# class GroupViewSet(viewsets.ModelViewSet):
#     # API endpoint that allows groups to be viewed or edited.
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]
