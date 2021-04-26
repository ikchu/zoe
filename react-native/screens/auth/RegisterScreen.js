import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import LoginInput from '../../components/auth/LoginInput';
import AuthButton from '../../components/auth/AuthButton';
import AbhayaSB from '../../components/text/AbhayaSB';
import MontserratR from '../../components/text/MontserratR';

import {useDispatch} from 'react-redux';
import {signIn} from '../../store/actions/auth';

import Colors from '../../constants/colors';

import API from '../../axios/api';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const nameInputHandler = (e) => {
    setName(e);
  };
  const emailInputHandler = (e) => {
    setEmail(e);
  };
  const usernameInputHandler = (e) => {
    setUsername(e);
  };
  const passwordInputHandler = (e) => {
    setPassword(e);
  };

  const dispatch = useDispatch();

  // NOTE: don't do this here because we still need to go to the 'Last Q' screen before redirecting to homepage
  // if we set a token here, we'll automatically be redirected to home page
  // I think what I'll do is save the inputs (name, email, username, password) in redux vars then only post in 'Last Q' page
  const registerHandler = useCallback(
    (data) => {
      API.post('/users/', {
        name: name,
        email: email,
        username: username,
        password: password,
      })
        .then((response) => {
          const {token} = response.data;
          dispatch(signIn(token));
        })
        .catch((error) => console.log(error));
    },
    [dispatch, email, name, password, username],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding">
        <Pressable
          style={styles.registerScreen}
          onPress={() => Keyboard.dismiss()}>
          <AbhayaSB>Create Account</AbhayaSB>
          <MontserratR style={styles.subHeader}>
            Enter your details and start connecting with your friends.
          </MontserratR>
          <LoginInput
            placeholder="Full name"
            onChangeText={nameInputHandler}
            returnKeyType="next"
          />
          <LoginInput
            placeholder="Email"
            onChangeText={emailInputHandler}
            returnKeyType="next"
          />
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
          <AuthButton onPress={() => registerHandler()}>Sign Up</AuthButton>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.c2,
  },
  registerScreen: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  subHeader: {
    marginVertical: 15,
  },
});

export default RegisterScreen;
