import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import TimelineScreen from '../screens/Timeline';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
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