/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function LoginScreen() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login</Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='ascii-capable'
          placeholder='username'>
        </TextInput>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          keyboardType='ascii-capable'
          onSubmitEditing={HomeScreen}
          placeholder='password'
          returnKeyType='go'
          secureTextEntry={true}>
        </TextInput>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8888/api/posts/?format=json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({description}, index) => description}
            renderItem={({item}) => (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> {item.user_name} </Text>
                <Text> {item.description} </Text>
                <Image source={{uri: item.pic}} style={{width: 300, height: 300}} />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
