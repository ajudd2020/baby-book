import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the HOME SCREEN</Text>
      <Button
        title='Add a picture!'
        onPress={() => navigation.navigate('Add')}
      />
    </View>
  );
}
