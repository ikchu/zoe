import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

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
    backgroundColor: '#C6AB92',
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    marginVertical: 8,
    width: '80%',
  },
  loginInput: {
    color: 'white',
    flex: 1,
    width: '90%',
  },
});

export default LoginInput;
