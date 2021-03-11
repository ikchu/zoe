import React from 'react';
import {View, StyleSheet} from 'react-native';

import ImageCard from './ImageCard';
import Name from './Name';
import Description from './Description';
import Colors from '../constants/colors';

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
    backgroundColor: Colors.light,
    flexDirection: 'row',
    height: 100,
    marginVertical: 2,
    width: '100%',
  },
  details: {
    paddingLeft: 15,
    paddingTop: 10,
  },
});

export default PostCard;
