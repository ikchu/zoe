from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        """
        Require authentication unless the user is trying to 
        create an account via a POST request
        """
        if request.user.is_authenticated:
            return True
        else:
            return request.method == 'POST'

    def has_object_permission(self, request, view, obj):
        """
        By this point, we know the user is authenticated.
        The user should be able to view any other users in
        the queryset or modify their own user instance
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return obj == request.user