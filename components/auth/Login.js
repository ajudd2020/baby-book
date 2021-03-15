import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.main} behavior='padding' enabled>
        <Text style={styles.title}>Login to your Baby Book!</Text>
        <TextInput
          style={styles.input}
          placeholder='Your Email'
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          onPress={() => onSignIn()}
          color='#04386C'
          title='Sign Me In!'
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF5E1',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    height: 30,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    borderRadius: 5,
  },
});
