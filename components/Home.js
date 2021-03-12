import React from 'react';
import { Button, Text, View } from 'react-native';

import firebase from 'firebase';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BabyBookScreen from './main/BabyBook';

const Container = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export default function Home({ navigation }) {
  // console.log(firebase.auth());
  // console.log('NAVIGATION', navigation);
  return (
    <>
      <Tab.Navigator
        initialRouteName='Baby Book'
        activeColor='#e91e63'
        barStyle={{ backgroundColor: 'aqua' }}
      >
        <Tab.Screen
          name='Baby Book'
          component={BabyBookScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='baby-face-outline'
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Add a Picture'
          component={Container}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              console.log('CLICKED', navigation);
              event.preventDefault();
              navigation.navigate('Add');
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='plus-circle'
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Logout'
          component={Container}
          listeners={() => ({
            tabPress: () => {
              firebase.auth().signOut();
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='logout-variant'
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
