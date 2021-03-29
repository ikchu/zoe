import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MessengerScreen from '../screens/MessengerScreen';

const Stack = createStackNavigator();

const MessagesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messenger" component={MessengerScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
