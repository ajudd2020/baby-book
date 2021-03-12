import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Login({ navigation }) {
  console.log('IN THE LOGIN');
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>This is the Login Page</Text>
    </View>
  );
}
