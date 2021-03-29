import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const TimerScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Set a Timer</Text>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;
