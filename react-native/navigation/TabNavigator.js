import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileStackNavigator from './ProfileStackNavigator';
import MessagesStackNavigator from './MessagesStackNavigator';
import PostsStackNavigator from './PostsStackNavigator';
import ExperiencesStackNavigator from './ExperiencesStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    if (route.name === 'Posts') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Experiences') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'Messenger') {
      iconName = focused ? 'chatbubble' : 'chatbubble-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'cog' : 'cog-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: Colors.c1,
  inactiveTintColor: Colors.c1,
  showLabel: false,
  style: {backgroundColor: Colors.c4},
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Messenger" component={MessagesStackNavigator} />
      <Tab.Screen name="Posts" component={PostsStackNavigator} />
      <Tab.Screen name="Experiences" component={ExperiencesStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
