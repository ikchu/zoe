from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.conf import settings
from django.http import HttpResponseRedirect
from feed.models import Post
from .models import Profile, FriendRequest
from .forms import AddUserForm, UserRegistrationForm, UserUpdateForm, ProfileUpdateForm
import random

# NOTE: why is login not required for this one?
# I guess in the profile.html (the only tpl where this is called), we verify the user first
def friend_list(request):
    user = request.user.profile
    friends = user.friends.all()
    context = {
            'friends': friends,
    }
    return render(request, 'users/friend_list.html', context)

@login_required
def add_users(request):
    if request.method == 'POST':
        form = AddUserForm(request.POST)
        if form.is_valid():
            to_user = User.objects.filter(username=form.cleaned_data.get('to_user'))
            if to_user.exists():
                FriendRequest.objects.create(to_user=to_user.first(), from_user=request.user)
        return redirect('add_users')
    else:
        form = AddUserForm()
    return render(request, 'users/add_users.html', {'form':form})

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
# @permission_required
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
