import React from 'react';
import {View, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import VerticalFeed from '../components/VerticalFeed';
import Header from '../components/Header';

const HomeScreen = ({navigation}) => {
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

export default HomeScreen;
