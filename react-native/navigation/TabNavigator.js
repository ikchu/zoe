import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from '../navigation/HomeStackNavigator';
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
  activeTintColor: 'white',
  inactiveTintColor: 'white',
  activeBackgroundColor: Colors.light,
  inactiveBackgroundColor: Colors.light,
  showLabel: false,
  style: {backgroundColor: Colors.light},
};

const TabNavigator = () => {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Messenger" component={MessengerScreen} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    color: Colors.light,
  },
});

export default TabNavigator;
