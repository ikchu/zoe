import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const NotificationsScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Notifications!</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
