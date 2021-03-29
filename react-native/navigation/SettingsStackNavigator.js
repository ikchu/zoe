import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import DeactivateScreen from '../screens/settings/DeactivateScreen';
import TimerScreen from '../screens/settings/TimerScreen';
import HelpScreen from '../screens/settings/HelpScreen';
import AboutScreen from '../screens/settings/AboutScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import SupportScreen from '../screens/settings/SupportScreen';

import Colors from '../constants/colors';

const Stack = createStackNavigator();

const screenOptions = {
  headerLeftContainerStyle: {
    paddingLeft: 12,
  },
  headerBackTitleVisible: false,
  headerTintColor: Colors.c4,
  headerTitleStyle: {
    fontFamily: 'AbhayaLibre-SemiBold',
    fontSize: 20,
  },
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notificatons" component={NotificationsScreen} />
      <Stack.Screen name="Deactivate" component={DeactivateScreen} />
      <Stack.Screen name="Timer" component={TimerScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
