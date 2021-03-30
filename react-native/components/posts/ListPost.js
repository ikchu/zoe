import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';
import ImageCard from './ImageCard';
import MontserratR from '../text/MontserratR';

const GridPost = (props) => {
  return (
    <View style={styles.container}>
      <ImageCard
        uri={props.post.pic}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <MontserratR style={styles.name}>
          {props.post.user.username}
        </MontserratR>
        <MontserratR style={styles.description}>
          {props.post.description}
        </MontserratR>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  imageContainer: {
    height: 120,
    width: 120,
  },
  details: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: Colors.c1,
  },
  name: {
    color: Colors.c4,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.c3,
    fontWeight: 'bold',
  },
});

export default GridPost;
