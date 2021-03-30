import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EventsScreen from '../screens/experiences/EventsScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const ExperiencesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Events" component={EventsScreen} />
    </Stack.Navigator>
  );
};

export default ExperiencesStackNavigator;
