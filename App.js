import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/components/BottomNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuthStore from './src/store/AuthStore';
import useUserStore from './src/store/UserStore';
import LandingScreen from './src/screens/Auth/Landing';
import LoginScreen from './src/screens/Auth/Login';
import RegisterScreen from './src/screens/Auth/Register';
import { supabase } from './src/lib/supabase';
import * as UserService from './src/services/UserService';

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
  const storeAuthData = useAuthStore(state => state.storeAuthData);
  const storeUserData = useUserStore(state => state.storeUserData);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();

      if (data.session && !error) {
        storeAuthData(data.session);

        const { data: userData, error: userDataError } = await UserService.getUserData(data.session.user.id);
        if (userData && !userDataError) {
          storeUserData(userData[0]);
        } else {
          getSession();
        }
      }
    }

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      storeAuthData(session);
    })
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {authData && authData.user ? <AppScreen /> : <AuthScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;