import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Dialog } from "@rneui/themed";
import { Pressable, Text } from "react-native";
import TimelineScreen from "../screens/App/Timeline";
import * as AuthService from "../services/AuthService";
import ProfileScreen from "../screens/App/Profile";
import NewPostScreen from "../screens/App/Post/NewPost";
import useAuthStore from "../store/AuthStore";
import usePostStore from "../store/PostStore";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const navigation = useNavigation();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const resetAllNewPostData = usePostStore(
    (state) => state.resetAllNewPostData
  );

  const [isNewPostBackDialogVisible, setIsNewPostBackDialogVisible] =
    useState(false);

  const handleLogout = async () => {
    const { isError, errorMessage } = await AuthService.logout();
    if (!isError) {
      removeAuthData();
    }
  };

  const toggleNewPostBack = () => {
    setIsNewPostBackDialogVisible(!isNewPostBackDialogVisible);
  };

  const newPostBack = () => {
    toggleNewPostBack();
    resetAllNewPostData();
    navigation.navigate("Timeline");
  };

  return (
    <>
      <Dialog
        isVisible={isNewPostBackDialogVisible}
        onBackdropPress={toggleNewPostBack}
      >
        <Dialog.Title title="Peringatan" />
        <Text>Apakah kamu ingin membatalkan post baru?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Ya" onPress={newPostBack} />
          <Dialog.Button title="Tidak" onPress={toggleNewPostBack} />
        </Dialog.Actions>
      </Dialog>
      <Tab.Navigator
        initialRouteName="Timeline"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{
            headerTitle: "Temuin",
            headerRight: () => (
              <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                <Icon type="ant-design" name="logout" color="black" />
              </Pressable>
            ),
            tabBarLabel: "Beranda",
            tabBarIcon: ({ color, size }) => (
              <Icon type="feather" name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="NewPostTab"
          component={NewPostScreen}
          options={{
            headerTitle: "Postingan Baru",
            headerLeft: () => (
              <Pressable onPress={toggleNewPostBack} style={{ marginLeft: 10 }}>
                <Icon type="feather" name="chevron-left" color="black" />
              </Pressable>
            ),
            tabBarLabel: "Post Baru",
            tabBarIcon: ({ color, size }) => (
              <Icon
                type="feather"
                name="plus-circle"
                color={color}
                size={size}
              />
            ),
            tabBarStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: "Profil",
            headerRight: () => (
              <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                <Icon type="ant-design" name="logout" color="black" />
              </Pressable>
            ),
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <Icon type="feather" name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
