import React from 'react';
import {View, StyleSheet} from 'react-native';

import Name from '../Name';
import Description from './Description';
import ImageCard from './ImageCard';

const PostDetailHeader = (props) => {
  if (props.user.profile.image === null) {
    props.user.profile.image =
      'http://192.168.1.188:8888/static/img/default.png';
  }
  return (
    <View style={styles.container}>
      <ImageCard
        uri={props.user.profile.image}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.name}>
        <Name>{props.user.username}</Name>
        <Description>Location PlaceHolder</Description>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default PostDetailHeader;
