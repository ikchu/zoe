import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

function SettingsScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Settings!</Text>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;