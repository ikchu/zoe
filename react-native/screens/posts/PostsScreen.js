import React from 'react';
import {View, StyleSheet} from 'react-native';

import VerticalFeed from '../../components/posts/VerticalFeed';
import Header from '../../components/Header';

const PostsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header style={styles.headerStyle}>All Posts</Header>
      <VerticalFeed navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  headerStyle: {
    marginLeft: 10,
  },
});

export default PostsScreen;
