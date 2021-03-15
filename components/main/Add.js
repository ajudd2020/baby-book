import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function Add(props) {
  const [image, setImage] = React.useState(null);
  console.log('IN THE ADD VIEW');

  const navigation = props.navigation;

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (image) {
    console.log('IMAGE?', image);
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        <Button title='Pick a different image' onPress={pickImage} />
        <Button
          title='Add caption and save to my baby book'
          onPress={() => {
            navigation.navigate('CreatePost', { image });
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF5E1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
