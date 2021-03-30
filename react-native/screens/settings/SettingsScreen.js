/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import SettingButton from '../../components/settings/SettingButton';

const SettingsScreen = ({navigation}) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default SettingsScreen;
