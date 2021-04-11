/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import AuthNavigator from './navigation/AuthNavigator';
import SplashScreen from './screens/SplashScreen';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import authReducer from './store/reducers/auth.js';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({ar: authReducer});
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
const persistor = persistStore(store);

// Small optimization: react-navigation will use native, optimized screen components for android/ios
// Good practice to do this for any react-native project
enableScreens();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        {/* <StatusBar barStyle="light-content" /> */}
        <AuthNavigator />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
