import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
// import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';
import Colors from '../constants/colors';

import {restoreToken} from '../store/actions/auth.js';
import * as SecureStore from 'expo-secure-store';

const AuthNavigator = () => {
  const dispatch = useDispatch();

  const restoreTokenHandler = useCallback(
    (token) => {
      dispatch(restoreToken(token));
    },
    [dispatch],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (error) {
        console.log(error);
      }
      restoreTokenHandler(userToken);
    };
    bootstrapAsync();
  }, [restoreTokenHandler]);

  const userToken = useSelector((state) => state.ar.userToken);

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        {userToken == null ? <AuthStackNavigator /> : <MainStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    color: Colors.light,
  },
});

export default AuthNavigator;
