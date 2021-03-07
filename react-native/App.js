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
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text>Login</Text>
      </View>
      <View style={styles.loginView}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='ascii-capable'
          onChangeText={(username) => setUsername(username)}
          placeholder='username'
          style={styles.loginInput}
        />
      </View>
      <View style={styles.loginView}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          keyboardType='ascii-capable'
          onChangeText={(password) => setPassword(password)}
          placeholder='password'
          returnKeyType='go'
          secureTextEntry={true}
          style={styles.loginInput}
        />
      </View>
      <TouchableOpacity style={styles.forgotButton}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton}>
        <Text>Create New Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text>Login</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  loginView: {
    alignItems: 'center',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    width: '70%',
  },
  loginInput: {
    alignItems: 'center',
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    color: '#000000',
    flex: 1,
    height: 50,
    padding: 10,
    width: '80%',
  },
  forgotButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 25,
    height: 30,
    justifyContent: 'center',
    marginTop: 40,
    width: '20%',
  },
});

export default App;
