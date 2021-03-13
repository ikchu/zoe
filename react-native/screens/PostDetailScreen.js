import React from 'react';
import {View, Text, Button} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const PostDetailScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Post Detail Sreen</Text>
        <Button title="Go to Home" onPress={() => props.navigation.navigate({routeName: 'Home'})} />
      </View>
    </SafeAreaView>
  );
};

export default PostDetailScreen;
