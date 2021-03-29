import React from 'react';
import {View} from 'react-native';

import SettingButton from '../../components/settings/SettingButton';

const SettingsScreen = (props) => {
  return (
    <View>
      <SettingButton text="Notifications" />
      <SettingButton text="De-activate" />
      <SettingButton text="Set Timer" />
      <SettingButton text="Help" />
      <SettingButton text="About App" />
      <SettingButton text="Send Feedback" />
      <SettingButton text="Support" />
      <SettingButton text="App Version" />
    </View>
  );
};

export default SettingsScreen;
