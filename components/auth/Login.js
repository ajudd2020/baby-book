import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // code from documentation: https://firebase.google.com/docs/auth/web/password-auth
  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  return (
    <View style={styles.main}>
      <Text>This is the signin page!</Text>
      <TextInput
        placeholder='Your Email'
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={() => onSignIn()} title='Sign Me In!' />
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
