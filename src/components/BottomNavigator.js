import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import { Pressable, Text } from 'react-native';
import TimelineScreen from '../screens/App/Timeline';
import * as AuthService from '../services/AuthService';
import ProfileScreen from '../screens/App/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewPostScreen from '../screens/App/Post/NewPost';
import NewPostFormScreen from '../screens/App/Post/NewPostForm';
import NewPostTypeSelectionScreen from '../screens/App/Post/NewPostTypeSelection';
import useAuthStore from '../store/AuthStore';
import usePostStore from '../store/PostStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function NewPostScreens() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="NewPost" component={NewPostScreen} />
            <Stack.Screen name="NewPostForm" component={NewPostFormScreen} />
            <Stack.Screen name="NewPostTypeSelection" component={NewPostTypeSelectionScreen} />
        </Stack.Navigator>
    );
}

export default function BottomNavigator({ navigation }) {
    const removeAuthData = useAuthStore(state => state.removeAuthData);
    const resetAllNewPostData = usePostStore(state => state.resetAllNewPostData);

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
                name="NewPostTab"
                component={NewPostScreens}
                options={({ route, navigation }) => ({
                    headerTitle: 'Postingan Baru',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Timeline');
                                resetAllNewPostData();
                            }}
                            style={{ marginLeft: 10 }}>
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