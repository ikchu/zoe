import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsScreen from '../screens/posts/PostsScreen';
import PostDetailScreen from '../screens/posts/PostDetailScreen';
import RecentsScreen from '../screens/posts/RecentsScreen';
import NewPostScreen from '../screens/posts/NewPostScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const PostsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Posts" component={PostsScreen} options={{}} />
      <Stack.Screen name="Recents" component={RecentsScreen} options={{}} />
      <Stack.Screen name="Details" component={PostDetailScreen} />
      <Stack.Screen name="New Post" component={NewPostScreen} />
    </Stack.Navigator>
  );
};

export default PostsStackNavigator;
