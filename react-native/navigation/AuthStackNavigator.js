import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const screenOptions = () => ({
  headerLeftContainerStyle: {
    paddingLeft: 12,
  },
  headerBackTitleVisible: false,
  headerTintColor: 'white',
  headerTitle: '',
  headerTransparent: true,
});

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
