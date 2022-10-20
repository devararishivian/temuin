import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./components/BottomNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;