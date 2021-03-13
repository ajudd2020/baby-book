import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './redux/store';

import HomeScreen from './components/Home';
import AddScreen from './components/main/Add';
import WelcomeScreen from './components/auth/Welcome';
import SignUpScreen from './components/auth/SignUp';
import LoginScreen from './components/auth/Login';
import CreatePostScreen from './components/main/CreatePost';

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
      <Provider store={store}>
        {this.state.loggedIn ? (
          <>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                  options={{ title: 'Your Baby Book' }}
                />

                <Stack.Screen
                  name='CreatePost'
                  component={CreatePostScreen}
                  options={{ title: 'Create Post' }}
                  navigation={this.props.navigation}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        ) : (
          <>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen
                  name='Welcome'
                  component={WelcomeScreen}
                  options={{ title: 'Welcome To Baby Book' }}
                />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        )}
      </Provider>
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
