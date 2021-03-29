import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EventsScreen from '../screens/experiences/EventsScreen';

const Stack = createStackNavigator();

const ExperiencesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventsScreen} />
    </Stack.Navigator>
  );
};

export default ExperiencesStackNavigator;
