import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';

import ProfileHeader from '../components/ProfileHeader.js';

// Temp: hardcoding a user for styling, since I don't have auth/redux set up
// TODO: get actual current user, probably from redux after login/authentication
const user = {
  url: 'http://192.168.1.188:8888/api/users/2/',
  username: 'ikaia2',
  email: 'fake@gmail.com',
  groups: [],
  profile: {
    url: 'http://192.168.1.188:8888/api/profiles/2/',
    image:
      'http://192.168.1.188:8888/media/profile_pics/Screen_Shot_2021-02-13_at_7.01.39_PM_GzOzWfk.png',
  },
};

const ProfileScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ProfileHeader user={user} />
      </View>
      <View>
        <Text>My Posts</Text>
      </View>
      <View>
        <Text>My Experiences</Text>
      </View>
      <Text>{useSelector((state) => state.ar.userToken)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
});

export default ProfileScreen;
