import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import API from '../../axios/api';
import Colors from '../../constants/colors';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import AbhayaSB from '../../components/text/AbhayaSB';

const ProfileScreen = (props) => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const user_hyperlink = useSelector((state) => state.ar.user);
  const token = useSelector((state) => state.ar.token);

  const trim = user_hyperlink.replace(/\/$/, '');
  const userid = trim.split('/').pop();

  useEffect(() => {
    API.get(`/users/${userid}/`, {headers: {Authorization: `Token ${token}`}})
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [token, userid]);

  useEffect(() => {
    API.get(`/profiles/${userid}/`, {headers: {Authorization: `Token ${token}`}})
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, [token, userid]);

  return (
    <View style={styles.container}>
      <View>
        <ProfileHeader user={user} profile={profile} />
      </View>
      <View style={styles.gridList}>
        <AbhayaSB style={styles.title}>My Posts</AbhayaSB>
      </View>
      <View style={styles.gridList}>
        <AbhayaSB style={styles.title}>My Experiences</AbhayaSB>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 25,
  },
  gridList: {
    marginTop: 30,
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.c4,
  },
});

export default ProfileScreen;
