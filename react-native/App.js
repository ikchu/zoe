/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {enableScreens} from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';

import TabNavigator from './navigation/TabNavigator';

// Small optimization: react-navigation will use native, optimized screen components for android/ios
// Good practice to do this for any react-native project
enableScreens();

const App: () => React$Node = () => {
  // return <TabNavigator />;
  return <Icon name="rocket" size={30} color="#900" />;
};

export default App;
