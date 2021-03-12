import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
