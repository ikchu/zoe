import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

const LoginInput = (props) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="ascii-capable"
          placeholderTextColor="white"
          style={styles.loginInput}
          ref={props.innerRef}
          blurOnSubmit={false}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: Colors.c3,
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    marginVertical: 8,
    width: '80%',
  },
  loginInput: {
    color: Colors.c1,
    flex: 1,
    width: '90%',
  },
});

export default LoginInput;
