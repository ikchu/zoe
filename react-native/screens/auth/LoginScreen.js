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
import SmallTextButton from '../../components/auth/SmallTextButton';
import AbhayaSB from '../../components/text/AbhayaSB';
import MontserratR from '../../components/text/MontserratR';

import {useDispatch} from 'react-redux';
import {signIn} from '../../store/actions/auth';

import Colors from '../../constants/colors';

import API from '../../axios/api';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInputHandler = (e) => {
    setUsername(e);
  };
  const passwordInputHandler = (e) => {
    setPassword(e);
  };

  const dispatch = useDispatch();

  const signInHandler = useCallback(
    (data) => {
      API.post('/login/', {username: username, password: password})
        .then(async (response) => {
          const {token} = response.data;
          // await SecureStore.setItemAsync('token', token);
          dispatch(signIn(token));
        })
        .catch((error) => console.log(error));
    },
    [dispatch, password, username],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding">
        <Pressable
          style={styles.loginScreen}
          onPress={() => Keyboard.dismiss()}>
          <AbhayaSB>Welcome!</AbhayaSB>
          <MontserratR style={styles.subHeader}>
            Log into your existing account.
          </MontserratR>
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
          <AuthButton onPress={signInHandler}>Log In</AuthButton>
          <SmallTextButton>Forgot Password?</SmallTextButton>
          <SmallTextButton onPress={() => navigation.navigate('Register')}>
            Create an Account
          </SmallTextButton>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.c2,
  },
  loginScreen: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  subHeader: {
    marginVertical: 15,
  },
});

export default LoginScreen;
