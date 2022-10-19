import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function LandingScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Landing Screen</Text>
        <Button
          title="Go to Timeline"
          onPress={() => navigation.navigate('Timeline')}
        />
      </View>
    );
  }