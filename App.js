import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/components/BottomNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuthStore from './src/store/index'
import LandingScreen from './src/screens/Auth/Landing';
import LoginScreen from './src/screens/Auth/Login';
import RegisterScreen from './src/screens/Auth/Register';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
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