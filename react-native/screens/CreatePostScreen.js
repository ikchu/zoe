import React from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const CreatePostScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Create a Post!</Text>
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
