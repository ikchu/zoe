import React from 'react';
import {View, StyleSheet} from 'react-native';

import NavButton from '../components/NavButton';

import Colors from '../constants/colors';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.view}>
      <NavButton
        iconName="person"
        text="Profile"
        onPress={() => navigation.navigate('TabNav', {screen: 'Profile'})}
      />
      <NavButton
        iconName="chatbubble"
        text="Messages"
        onPress={() => navigation.navigate('TabNav', {screen: 'Messenger'})}
      />
      <NavButton
        iconName="camera"
        text="Posts"
        onPress={() => navigation.navigate('TabNav', {screen: 'Posts'})}
      />
      <NavButton
        iconName="calendar"
        text="Experiences"
        onPress={() => navigation.navigate('TabNav', {screen: 'Experiences'})}
      />
      <NavButton
        iconName="cog"
        text="Settings"
        onPress={() => navigation.navigate('TabNav', {screen: 'Settings'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: Colors.c2,
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
