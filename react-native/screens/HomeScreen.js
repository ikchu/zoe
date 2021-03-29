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
        onPress={() => navigation.navigate('Profile')}
      />
      <NavButton
        iconName="chatbubble"
        text="Messages"
        onPress={() => navigation.navigate('Messages')}
      />
      <NavButton
        iconName="camera"
        text="Posts"
        onPress={() => navigation.navigate('Posts')}
      />
      <NavButton
        iconName="calendar"
        text="Experiences"
        onPress={() => navigation.navigate('Experiences')}
      />
      <NavButton
        iconName="cog"
        text="Settings"
        onPress={() => navigation.navigate('Settings')}
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
