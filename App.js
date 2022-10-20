import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/components/BottomNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAuthStore from './src/store/index'
import LandingScreen from './src/screens/Auth/Landing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing Screen" component={LandingScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

const AppScreen = () => {
  return (
    <BottomNavigator></BottomNavigator>
  );
}

function App() {
  const authData = useAuthStore(state => state.authData);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {authData ? <AppScreen /> : <AuthScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;