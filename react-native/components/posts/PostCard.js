import React from 'react';
import {View, StyleSheet} from 'react-native';

import ImageCard from './ImageCard';
import Name from '../Name';
import Description from './Description';

const PostCard = (props) => {
  return (
    <View style={styles.container}>
      <ImageCard
        uri={props.post.pic}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Name>{props.post.user.username}</Name>
        <Description>{props.post.description}</Description>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
    height: 230,
  },
  imageContainer: {
    height: 170,
    width: '100%',
  },
  details: {
    alignItems: 'center',
    paddingTop: 5,
    width: '100%',
  },
});

export default PostCard;
