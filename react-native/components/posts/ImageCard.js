import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageCard = (props) => {
  return (
    <View style={{...styles.card, ...props.cardStyle}}>
      <Image
        source={{uri: props.uri}}
        style={styles.image}
        resizeMode="contain"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

export default ImageCard;
