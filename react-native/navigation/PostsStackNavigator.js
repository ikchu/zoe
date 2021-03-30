import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsScreen from '../screens/posts/PostsScreen';
import PostDetailScreen from '../screens/posts/PostDetailScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const PostsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Recents" component={PostsScreen} options={{}} />
      <Stack.Screen name="Details" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default PostsStackNavigator;
