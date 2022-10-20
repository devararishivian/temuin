import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Landing Screen</Text>
      <Text>Disini nantinya akan mengarahkan ke Login / register jika belum login</Text>

      <Button
        title="Mulai"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}