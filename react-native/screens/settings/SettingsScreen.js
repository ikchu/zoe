/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import SettingButton from '../../components/common/WideButton';

import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../../store/actions/auth'
import API from '../../axios/api';

const SettingsScreen = ({navigation}) => {
  // TODO: eventually move all this signout logic somewhere else
  // Just did it here for quick proof of concept
  const dispatch = useDispatch();

  const token = useSelector((store) => store.ar.token);

  const signOutHandler = useCallback(() => {
    API.get('/logout/', {headers: {Authorization: `Token ${token}`}})
      .then(() => {
        dispatch(signOut());
      })
      .catch((error) => {console.log(error); dispatch(signOut());});
  }, [dispatch, token]);

  return (
    <View style={styles.container}>
      <SettingButton text="Notifications" onPress={() => navigation.navigate('Notifications')} />
      <SettingButton text="De-activate" onPress={() => navigation.navigate('Deactivate')} />
      <SettingButton text="Set Timer" onPress={() => navigation.navigate('Timer')} />
      <SettingButton text="Help" onPress={() => navigation.navigate('Help')} />
      <SettingButton text="About App" onPress={() => navigation.navigate('About')} />
      <SettingButton text="Send Feedback" onPress={() => navigation.navigate('Feedback')} />
      <SettingButton text="Support" onPress={() => navigation.navigate('Support')} />
      <SettingButton text="App Version" />
      <SettingButton text="Log Out" onPress={signOutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});

export default SettingsScreen;
