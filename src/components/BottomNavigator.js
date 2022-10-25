import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import { Pressable } from 'react-native';
import TimelineScreen from '../screens/App/Timeline';
import * as AuthService from '../services/AuthService';
import useAuthStore from '../store/index';
import ProfileScreen from '../screens/App/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ navigation }) {
    const removeAuthData = useAuthStore(state => state.removeAuthData);

    const handleLogout = async () => {
        const { isError, errorMessage } = await AuthService.logout();
        if (!isError) {
            removeAuthData();
        }

        return navigation.popToTop();
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
                component={TimelineScreen}
                options={{
                    tabBarLabel: 'Post Baru',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type='feather' name='plus-circle' color={color} size={size} />
                    ),
                }}
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