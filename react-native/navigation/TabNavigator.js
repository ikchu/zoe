import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PostsStackNavigator from './PostsStackNavigator';
import EventsScreen from '../screens/EventsScreen';
import MessengerScreen from '../screens/MessengerScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Events') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'Messenger') {
      iconName = focused ? 'chatbubble' : 'chatbubble-outline';
    } else if (route.name === 'Notifications') {
      iconName = focused ? 'heart' : 'heart-outline';
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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
        tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Home" component={PostsStackNavigator} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Messenger" component={MessengerScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
