import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
// import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';
import SplashScreen from '../screens/SplashScreen';
import Colors from '../constants/colors';

import {restoreToken} from '../store/actions/auth';

const AuthNavigator = () => {
  const dispatch = useDispatch();

  // const restoreTokenHandler = useCallback(
  //   (token) => {
  //     dispatch(restoreToken(token));
  //   },
  //   [dispatch],
  // );

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let token;
  //     try {
  //       token = await SecureStore.getItemAsync('token');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     dispatch(restoreToken(token));
  //   };
  //   bootstrapAsync();
  // }, [dispatch]);

  const token = useSelector((state) => state.ar.token);

  if (useSelector((state) => state.ar.isLoading)) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        {token == null ? <AuthStackNavigator /> : <MainStackNavigator />}
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
