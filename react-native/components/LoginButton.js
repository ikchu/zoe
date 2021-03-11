import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const LoginButton = (props) => {
  return (
    <Pressable
      style={({pressed}) => (pressed ? styles.buttonPressed : styles.button)}>
      <Text style={styles.text}>LOG IN</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#967154',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    width: '80%',
  },
  buttonPressed: {
    alignItems: 'center',
    backgroundColor: '#967154',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    opacity: 0.8,
    width: '80%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginButton;
