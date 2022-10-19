import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/Landing';
import TimelineScreen from './screens/Timeline';
import Footer from './components/Footer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Footer></Footer>
    </NavigationContainer>
  );
}

export default App;