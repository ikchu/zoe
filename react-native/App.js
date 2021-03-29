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

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import authReducer from './store/reducers/auth.js';

const rootReducer = combineReducers({ar: authReducer});
const store = createStore(rootReducer);

import AuthNavigator from './navigation/AuthNavigator';

// Small optimization: react-navigation will use native, optimized screen components for android/ios
// Good practice to do this for any react-native project
enableScreens();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <AuthNavigator />
    </Provider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
