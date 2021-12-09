import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import MontserratBC from '../text/MontserratBC';

import Colors from '../../constants/colors';

const WideButton = (props) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? {...styles.buttonPressed, ...props.containerStyle}
          : {...styles.button, ...props.containerStyle}
      }
      {...props}>
      <MontserratBC style={{...styles.text, ...props.textStyle}}>{props.text}</MontserratBC>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.c15,
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: Colors.c15,
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    opacity: 0.8,
  },
  text: {
    color: Colors.c5,
  },
});

export default WideButton;
