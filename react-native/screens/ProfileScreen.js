import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile!</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
