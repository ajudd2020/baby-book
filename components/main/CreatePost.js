import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
// import { Picker, SafeAreaView } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/storage');

export default function CreatePost(props) {
  const [caption, setCaption] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [tags, setTags] = React.useState('');

  const uri = props.route.params.image;

  const path = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(36)}`;

  // First step is to upload the image to storage:
  const uploadImage = async () => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const task = firebase.storage().ref().child(path).put(blob);

    const taskProgress = (snapshot) => {
      console.log('SNAPSHOT?', snapshot);
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log('ERROR IN THE TASK', snapshot);
    };
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  // Once the image is uploaded to storage, we need to save it to the database with the information from the form.

  return (
    <View>
      <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />
      <TextInput
        style={{ fontSize: 20 }}
        placeholder='Write a caption...'
        onChangeText={(caption) => setCaption(caption)}
      />
      <TextInput
        style={{ fontSize: 20 }}
        placeholder='Tags seperated with commas'
        onChangeText={(tags) => setTags(tags)}
      />
      <Text style={{ fontSize: 20 }}>Category:</Text>
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
          style={{ fontSize: 20 }}
          placeholder='Enter Category'
          onChangeText={(category) => setCategory(category)}
        />
      ) : (
        <Text></Text>
      )}
      {/* <Picker
        selectedValue={category}
        style={{ height: 20, width: 200, margin: 0 }}
        onValueChange={(category, itemIndex) => setCategory(category)}
      >
        <Picker.Item label='Special Moments' value='specialMoments' />
        <Picker.Item label='Birthdays' value='bdays' />
        <Picker.Item label='Fun with Friends' value='funWithFriends' />
        <Picker.Item label='Fun with Family' value='funWithFamily' />
        <Picker.Item label='Other' value='other' />
      </Picker> */}
    </View>
  );
}

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
