import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.main}>
      <Button
        color='#04386C'
        title='Sign Up'
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        color='#04386C'
        title='Login'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EDF5E1',
  },
});
