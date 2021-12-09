import React from 'react';
import {View, StyleSheet} from 'react-native';

import IconButton from '../components/common/IconButton';

import Colors from '../constants/colors';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.view}>
      <IconButton
        iconName="person"
        invert={true}
        iconSize={30}
        iconColor={Colors.c1}
        text="Profile"
        style={styles.iconButton}
        onPress={() => navigation.navigate('TabNav', {screen: 'Profile'})}
      />
      <IconButton
        iconName="chatbubble"
        invert={true}
        iconSize={30}
        iconColor={Colors.c1}
        text="Messages"
        style={styles.iconButton}
        onPress={() => navigation.navigate('TabNav', {screen: 'Messenger'})}
      />
      <IconButton
        iconName="camera"
        invert={true}
        iconSize={30}
        iconColor={Colors.c1}
        text="Posts"
        style={styles.iconButton}
        onPress={() => navigation.navigate('TabNav', {screen: 'Posts'})}
      />
      <IconButton
        iconName="calendar"
        invert={true}
        iconSize={30}
        iconColor={Colors.c1}
        text="Experiences"
        style={styles.iconButton}
        onPress={() => navigation.navigate('TabNav', {screen: 'Experiences'})}
      />
      <IconButton
        iconName="cog"
        invert={true}
        iconSize={30}
        iconColor={Colors.c1}
        text="Settings"
        style={styles.iconButton}
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
  iconButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default HomeScreen;
