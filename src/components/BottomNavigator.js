import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import { Pressable, Text } from 'react-native';
import TimelineScreen from '../screens/App/Timeline';
import NewPostScreen from "../screens/App/NewPost";
import * as AuthService from '../services/AuthService';
import useAuthStore from '../store/AuthStore';
import ProfileScreen from '../screens/App/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ navigation }) {
    const removeAuthData = useAuthStore(state => state.removeAuthData);

    const handleLogout = async () => {
        const { isError, errorMessage } = await AuthService.logout();
        if (!isError) {
            removeAuthData();
        }
    }

    return (
        <Tab.Navigator
            initialRouteName="Timeline"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Timeline"
                component={TimelineScreen}
                options={{
                    headerTitle: 'Temuin',
                    headerRight: () => (
                        <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Icon type='ant-design' name="logout" color="black" />
                        </Pressable>
                    ),
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type='feather' name='home' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="NewPost"
                component={NewPostScreen}
                options={({ route, navigation }) => ({
                    headerTitle: 'Postingan Baru',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.navigate('Timeline')} style={{ marginLeft: 10 }}>
                            <Icon type='feather' name="chevron-left" color="black" />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Text name="logout" color="black">POST</Text>
                        </Pressable>
                    ),
                    tabBarLabel: 'Post Baru',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type='feather' name='plus-circle' color={color} size={size} />
                    ),
                    tabBarStyle: ((route) => {
                        return { display: "none" };
                    })(route),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type='feather' name='user' color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}