from django.contrib.auth import get_user_model
from users.models import Profile
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ['url', 'name', 'email', 'username', 'password']

    def create(self, validated_data):
        """
        Use default ModelSerializer.create function to create the new User.
        However, since that function stores the password as plain text, we 
        must then call django.contrib.auth.base_user.AbstractBaseUser.set_password
        which hashes the password field
        """
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        fields = ['url', 'image', 'bio', 'slug']