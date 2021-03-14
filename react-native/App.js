/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {enableScreens} from 'react-native-screens';

import TabNavigator from './navigation/TabNavigator';

// Small optimization: react-navigation will use native, optimized screen components for android/ios
// Good practice to do this for any react-native project
enableScreens();

const App: () => React$Node = () => {
  return <TabNavigator />;
};

export default App;
