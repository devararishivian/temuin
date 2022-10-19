import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TimelineScreen from '../screens/Timeline';

const Tab = createBottomTabNavigator();

export default function Footer() {
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
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="NewPost"
                component={TimelineScreen}
                options={{
                    tabBarLabel: 'Post Baru',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={TimelineScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}