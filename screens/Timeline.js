import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function TimelineScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Timeline Screen</Text>
        <Button
          title="Go to Landing"
          onPress={() => navigation.navigate('Landing')}
        />
      </View>
    );
  }