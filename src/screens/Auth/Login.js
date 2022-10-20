import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>

        <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')}
            />
      </View>
    );
  }