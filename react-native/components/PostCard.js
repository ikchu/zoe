import React from 'react';
import {View, StyleSheet} from 'react-native';

import ImageCard from './ImageCard';
import Name from './Name';
import Description from './Description';

const PostCard = (props) => {
  return (
    <View style={styles.card}>
      <ImageCard uri={props.post.pic} />
      <View style={styles.details}>
        <Name>{props.post.user.username}</Name>
        <Description>{props.post.description}</Description>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    paddingTop: 5,
    width: '100%',
  },
});

export default PostCard;
