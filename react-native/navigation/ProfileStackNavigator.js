import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import UserSearchScreen from '../screens/profile/UserSearchScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Tailor" component={EditProfileScreen} />
      <Stack.Screen name="Search Users" component={UserSearchScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
