import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './components/BottomNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNavigator></BottomNavigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;