import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const AboutScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>About Zoe</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
