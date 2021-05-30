import React from 'react';
import {StyleSheet} from 'react-native';

import ImageCard from '../posts/ImageCard';

const ProfilePicThumbnail = (props) => {
  return (
    <ImageCard
      uri={props.uri}
      cardStyle={{...styles.card, ...props.cardStyle}}
      resizeMode="cover"
      style={{...styles.image, ...props.imageStyle}}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default ProfilePicThumbnail;
