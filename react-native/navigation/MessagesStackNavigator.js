import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MessengerScreen from '../screens/messages/MessengerScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const MessagesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Messenger" component={MessengerScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
