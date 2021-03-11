import React, {useState} from 'react';
import {Keyboard, Pressable, Text, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import LoginInput from '../components/LoginInput';
import LoginButton from '../components/LoginButton';
import SmallTextButton from '../components/SmallTextButton';

const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInputHandler = (e) => {
    setUsername(e);
  };
  const passwordInputHandler = (e) => {
    setPassword(e);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.loginScreen} onPress={() => Keyboard.dismiss()}>
        <Text style={styles.header}> Welcome! </Text>
        <Text style={styles.subheader}> Log into your existing account. </Text>
        <LoginInput
          placeholder="Username"
          onChangeText={usernameInputHandler}
          returnKeyType="next"
        />
        <LoginInput
          placeholder="Password"
          onChangeText={passwordInputHandler}
          secureTextEntry
        />
        <LoginButton />
        <SmallTextButton text="Forgot Password?" />
        <SmallTextButton text="Create an Account" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#E5D6C6',
  },
  loginScreen: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 30,
    color: 'white',
  },
  subheader: {
    color: 'white',
    marginVertical: 10,
  },
});

export default LoginScreen;
