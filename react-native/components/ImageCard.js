import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageCard = (props) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: props.uri}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImageCard;
