import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import { Pressable, Text } from 'react-native';
import TimelineScreen from '../screens/App/Timeline';
import NewPostScreen from "../screens/App/NewPost";
import * as AuthService from '../services/AuthService';
import useAuthStore from '../store/index';

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
                name="Post Baru"
                component={NewPostScreen}
                options={{
                    headerTitle: 'Post Baru',
                    headerRight: () => (
                        <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Text name="logout" color="black">POST</Text>
                        </Pressable>
                    ),
                    tabBarLabel: 'Post Baru',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type='feather' name='plus-circle' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={TimelineScreen}
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