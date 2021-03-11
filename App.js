import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './components/Home';
import AddScreen from './components/main/Add';

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

export default function App() {
  // Need to create a view for users who are not logged in or who do not have an account.

  // This is the view for logged in users
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Your Baby Book' }}
        />
        <Stack.Screen name='Add' component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
