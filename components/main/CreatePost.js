import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// import { Picker, SafeAreaView } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/storage');

export default function CreatePost(props) {
  const [caption, setCaption] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [otherCategory, setOtherCategory] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // React.useEffect();

  const uri = props.route.params.image;

  const path = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(36)}`;

  // First step is to upload the image to storage:
  const uploadImage = async () => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const task = firebase.storage().ref().child(path).put(blob);
    setLoading(true);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        setLoading(false);
        saveDataToDb(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log('ERROR IN THE TASK', snapshot);
    };
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  // Once the image is uploaded to storage, we need to save it to the database with the information from the form.

  const saveDataToDb = (downloadURL) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('babyBookPosts')
      .add({
        downloadURL,
        caption,
        category,
        tags,
        otherCategory,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => props.navigation.navigate('Baby Book'));
  };

  console.log('LOADING', loading);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior='padding'
        enabled
        keyboardVerticalOffset={100}
      >
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator visible={loading} textContent={'Loading...'} />
          </View>
        ) : (
          <View style={styles.center}>
            <Image source={{ uri: uri }} style={styles.image} />
            <TextInput
              maxLength={50}
              style={styles.input}
              placeholder='Write a caption...'
              onChangeText={(caption) => setCaption(caption)}
            />
            <TextInput
              maxLength={50}
              style={styles.input}
              placeholder='Tags seperated with commas'
              onChangeText={(tags) => setTags(tags)}
            />
            <RNPickerSelect
              placeholder={{ label: 'Select a Category', value: null }}
              style={customPickerStyles}
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: 'Special Moments', value: 'specialMoments' },
                { label: 'Birthdays', value: 'bdays' },
                { label: 'Fun with Friends', value: 'funWithFriends' },
                { label: 'Fun with Family', value: 'funWithFamily' },
                { label: 'Other', value: 'other' },
              ]}
            />
            {category === 'other' ? (
              <TextInput
                style={styles.input}
                placeholder='Enter Category'
                onChangeText={(otherCategory) =>
                  setOtherCategory(otherCategory)
                }
              />
            ) : (
              <Text></Text>
            )}
            <Button
              color='#04386C'
              title='Create Post'
              onPress={() => uploadImage()}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF5E1',
    flexGrow: 1,
  },
  center: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    borderRadius: 5,
    margin: 5,
  },
  image: {
    margin: 10,
    width: 200,
    height: 200,
  },
});
