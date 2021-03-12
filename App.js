import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './components/Home';
import AddScreen from './components/main/Add';
import WelcomeScreen from './components/auth/Welcome';
import SignUpScreen from './components/auth/SignUp';
import LoginScreen from './components/auth/Login';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDga9proZZhfTW9X7HXsGvXTeRnMmmkSuk',
  authDomain: 'baby-book-project.firebaseapp.com',
  projectId: 'baby-book-project',
  storageBucket: 'baby-book-project.appspot.com',
  messagingSenderId: '107257283190',
  appId: '1:107257283190:web:18f95f89a92b7e3b455557',
  measurementId: 'G-M46G122KQR',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <NavigationContainer>
        {this.state.loggedIn ? (
          <>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Your Baby Book' }}
              />
              <Stack.Screen
                name='Add'
                component={AddScreen}
                navigation={this.props.navigation}
              />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator initialRouteName='Welcome'>
              <Stack.Screen
                name='Welcome'
                component={WelcomeScreen}
                options={{ title: 'Welcome To Baby Book' }}
              />
              <Stack.Screen name='SignUp' component={SignUpScreen} />
              <Stack.Screen name='Login' component={LoginScreen} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
