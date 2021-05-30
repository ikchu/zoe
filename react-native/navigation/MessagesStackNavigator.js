import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MessengerScreen from '../screens/messages/MessengerScreen';
import ConversationScreen from '../screens/messages/ConversationScreen';
import ComposeScreen from '../screens/messages/ComposeScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const MessagesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Messenger" component={MessengerScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="New Message" component={ComposeScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
