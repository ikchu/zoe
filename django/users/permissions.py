from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        """
        Require authentication unless the user is trying to 
        create an account via a POST request
        """
        return request.user.is_authenticated or request.method == 'POST'

    def has_object_permission(self, request, view, obj):
        """
        By this point, we know the user is authenticated.
        The user should be able to view any other users in
        the queryset or modify their own user instance
        """
        return request.method in permissions.SAFE_METHODS or obj == request.user

class ProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        """ 
        Always require authentication. Don't allow POST or DELETE,
        since a Profile is automatically created/deleted when the
        corresponding User is created/deleted
        """ 
        return request.user.is_authenticated and (request.method in permissions.SAFE_METHODS or request.method == 'PUT')

    def has_object_permission(self, request, view, obj):
        """
        By this point, we know the user is authenticated
        and the method is SAFE or PUT. The user should be 
        able to view any other profiles in the queryset or
        edit their own Profile instance
        """
        return request.method in permissions.SAFE_METHODS or obj.user == request.user