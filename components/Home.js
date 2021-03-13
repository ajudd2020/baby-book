import React from 'react';
import { Button, Text, View } from 'react-native';

import firebase from 'firebase';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { getUser } from '../redux/users';
import { getPosts } from '../redux/posts';

import BabyBookScreen from './main/BabyBook';
import AddScreen from './main/Add';

const Container = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export class Home extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getPosts();
  }

  render() {
    const user = this.props.user;
    const posts = this.props.posts;
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
            name='Add'
            component={AddScreen}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
