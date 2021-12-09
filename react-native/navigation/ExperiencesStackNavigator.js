import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ExperiencesScreen from '../screens/experiences/ExperiencesScreen';

import screenOptions from '../constants/header';

const Stack = createStackNavigator();

const ExperiencesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Experiences" component={ExperiencesScreen} />
    </Stack.Navigator>
  );
};

export default ExperiencesStackNavigator;
