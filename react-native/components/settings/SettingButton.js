import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import MontserratBC from '../text/MontserratBC';

import Colors from '../../constants/colors';

const SettingsButton = (props) => {
  return (
    <Pressable
      style={({pressed}) => (pressed ? styles.buttonPressed : styles.button)}
      {...props}>
      <MontserratBC style={styles.text}>{props.text}</MontserratBC>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.c2,
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: Colors.c2,
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    opacity: 0.8,
  },
  text: {
    color: Colors.c4,
  },
});

export default SettingsButton;
