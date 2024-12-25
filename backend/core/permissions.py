from rest_framework import permissions

class UpdateOwnProfile(permissions.BasePermission):
    """Allow users that are logged in to only update their own profile"""

    def has_object_permission(self, request, view, obj):
        """Checks if user has permission to modify"""
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.id == request.user.id
    

class UpdateOwnProject(permissions.BasePermission):
    """Allows users to enable only their own property"""
    
    def has_object_permission(self, request, view, obj):
        """Checks if user has permission to modify"""
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.author.id == request.user.id