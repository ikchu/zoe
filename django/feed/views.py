from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from .forms import NewPostForm, NewCommentForm
from django.views.generic import ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .models import Post, Comment
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

# Create your views here.
class PostListView(ListView):
    model = Post
    template_name = 'feed/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']
    paginate_by = 10
    def get_context_data(self, **kwargs):
        context = super(PostListView, self).get_context_data(**kwargs)
        # I left out some code here that I won't use... now it doesn't really make sense
        # to have this function defined... just return 
        return context

class UserPostListView(LoginRequiredMixin, ListView):
    model = Post
    template_name = 'feed/user_posts.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(UserPostListView, self).get_context_data(**kwargs)
        # same as note above... removed code so maybe don't need this def
        return context

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(user_name=user).order_by('-date_posted')

@login_required
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    user = request.user
    if request.method == 'POST':
        form = NewCommentForm(request.POST)
        if form.is_valid():
            data = form.save(commi=False)
            data.post = post
            data.username = user
            data.save()
            return redirect('post-detail', pk=pk)
    else:
        form = NewCommentForm()
    return render(request, 'feed/post_detail.html', {'post':post, 'form':form})

@login_required
def create_post(request):
    user = request.user
    if request.method == 'POST':
        form = NewPostForm(request.POST, request.FILES)
        if form.is_valid():
            data = form.save(commit=False)
            data.user_name = user
            data.save()
            messages.success(request, 'Posted Successfully')
            return redirect('home')
    else:
        form = NewPostForm()
    return render(request, 'feed/create_post.html', {'form':form})

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['description', 'pic', 'tags']
    template_name = 'feed/create_post.html'

    def form_valid(self, form):
        form.instance.user_name = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.usr == post.user_name:
            return True
        return False

@login_required
def post_delete(request, pk):
    post = Post.objects.get(pk=pk)
    if request.user == post.user_name:
        Post.objects.get(pk=pk).delete()
    return redirect('home')

@login_required
def search_posts(request):
    query = request.GET.get('p') # ?? is this something from the user? what is 'p'?
    object_list = Post.objects.filter(tags_icontains=query)
    return render(request, 'feed/search_posts.html', {'posts':object_list})
