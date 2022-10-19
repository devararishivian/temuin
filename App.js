import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './components/BottomNavigator';

function App() {
  return (
    <NavigationContainer>
      <BottomNavigator></BottomNavigator>
    </NavigationContainer>
  );
}

export default App;