import React from 'react';
import {View, StyleSheet} from 'react-native';

import Name from './Name';
import Description from './Description';
import ImageCard from './ImageCard';

const ProfileHeader = (props) => {
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
        <Name style={{fontSize: 25}}>{props.user.username}</Name>
        <Description>Location PlaceHolder</Description>
        <Description>{props.user.profile.bio}</Description>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
  },
  imageContainer: {
    borderColor: 'green',
    borderWidth: 1,
    width: 120,
    height: 120,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    borderColor: 'blue',
    borderWidth: 1,
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
  },
});

export default ProfileHeader;
