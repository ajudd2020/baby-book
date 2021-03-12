import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
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
    <View>
      <Text>This is the signup page!</Text>
      <TextInput
        placeholder='Your Name'
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        placeholder="Your Baby's Name"
        onChangeText={(babyName) => setBabyName(babyName)}
      />
      <TextInput
        placeholder='Your Email'
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        placeholder='Color (optional)'
        onChangeText={(color) => setColor(color)}
      />
      <Button onPress={() => onSignUp()} title='Sign Me Up!' />
    </View>
  );
}
