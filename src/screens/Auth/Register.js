import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Register Screen</Text>

        <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
      </View>
    );
  }