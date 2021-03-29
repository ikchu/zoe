/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import PostsStackNavigator from './PostsStackNavigator';
import MessagesStackNavigator from './MessagesStackNavigator';
import ExperiencesStackNavigator from './ExperiencesStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={ProfileStackNavigator} />
        <Stack.Screen name="Messages" component={MessagesStackNavigator} />
        <Stack.Screen name="Posts" component={PostsStackNavigator} />
        <Stack.Screen name="Experiences" component={ExperiencesStackNavigator} />
        <Stack.Screen name="Settings" component={SettingsStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
