import React from 'react';
import { Button, Text, View } from 'react-native';

import firebase from 'firebase';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { getUser } from '../redux/users';

import BabyBookScreen from './main/BabyBook';

const Container = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export class Home extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const user = this.props.user;
    if (user === undefined) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
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
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
