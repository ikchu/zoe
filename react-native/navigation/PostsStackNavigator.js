import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostsScreen from '../screens/posts/PostsScreen';
import PostDetailScreen from '../screens/posts/PostDetailScreen';

const Stack = createStackNavigator();

const PostsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PostsScreen} />
      <Stack.Screen name="Details" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default PostsStackNavigator;
