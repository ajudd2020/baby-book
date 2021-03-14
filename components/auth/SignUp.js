import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

export default function SignUp({ navigation }) {
  const [name, setName] = React.useState('');
  const [babyName, setBabyName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [color, setColor] = React.useState('');

  const onSignUp = async () => {
    try {
      // this is to get the user into the authentication part of the project. They are the uses that are registered with the app
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // after they are registered, we want to create an instance in the database to match the user with the information we will need in the app
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({ name, babyName, email });
    } catch (error) {
      console.log(
        'Error in the onSignUp function in the SignUp Component',
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.main} behavior='padding' enabled>
        <Text style={styles.title}>
          Fill out the form to create your Baby Book!
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Your Name'
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Baby's Name"
          onChangeText={(babyName) => setBabyName(babyName)}
        />
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
        <TextInput
          style={styles.input}
          placeholder='Color (optional)'
          onChangeText={(color) => setColor(color)}
        />
        <Button
          color='#04386C'
          onPress={() => onSignUp()}
          title='Sign Me Up!'
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
