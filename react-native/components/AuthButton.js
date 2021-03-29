import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import MontserratBC from './text/MontserratBC';

const AuthButton = (props) => {
  return (
    <Pressable
      style={({pressed}) => (pressed ? styles.buttonPressed : styles.button)}
      {...props}>
      <MontserratBC>{props.children}</MontserratBC>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.c4,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    width: '80%',
  },
  buttonPressed: {
    alignItems: 'center',
    backgroundColor: Colors.c4,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    opacity: 0.8,
    width: '80%',
  },
});

export default AuthButton;
