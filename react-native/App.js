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
  Pressable,
} from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInputHandler = (e) => {
    setUsername(e);
  };

  const passwordInputHandler = (e) => {
    setPassword(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text>Login</Text>
      </View>
      <View>
        <Text>Username: {username}</Text>
        <Text>Password: {password}</Text>
      </View>
      <View style={styles.loginView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="ascii-capable"
          onChangeText={usernameInputHandler}
          placeholder="Username"
          style={styles.loginInput}
        />
      </View>
      <View style={styles.loginView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          keyboardType="ascii-capable"
          onChangeText={passwordInputHandler}
          placeholder="Password"
          returnKeyType="go"
          secureTextEntry={true}
          style={styles.loginInput}
        />
      </View>
      <Pressable style={styles.forgotButton}>
        <Text>Forgot Password?</Text>
      </Pressable>
      <Pressable style={styles.forgotButton}>
        <Text>Create New Account</Text>
      </Pressable>
      <Pressable style={styles.loginButton}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.188:8888/api/posts/?format=json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Home!</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({description}, index) => description}
            renderItem={({item}) => (
              <View>
                <Text> {item.user_name} </Text>
                <Text> {item.description} </Text>
                <Image
                  source={{uri: item.pic}}
                  style={{width: 300, height: 300}}
                />
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
    <SafeAreaView>
      <View>
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
