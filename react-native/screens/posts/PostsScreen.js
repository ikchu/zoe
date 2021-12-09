import React from 'react';
import {View, Button} from 'react-native';

import VerticalListFeed from '../../components/posts/VerticalListFeed';

const PostsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <VerticalListFeed />
    </View>
  );
};

export default PostsScreen;
