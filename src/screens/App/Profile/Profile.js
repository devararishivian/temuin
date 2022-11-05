import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  RefreshControl
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as UserService from "../../../services/UserService";
import * as PostService from "../../../services/PostService";
import useAuthStore from "../../../store/AuthStore";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function ProfileScreen({ navigation }) {
  const authData = useAuthStore((state) => state.authData);
  const [refreshing, setRefreshing] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePict, setProfilePict] = useState("");
  const [registeredAt, setRegisteredAt] = useState("");
  const [posts, setPost] = useState();

  async function getUserData() {
    const { data, isError, errorMessage } = await UserService.getUserData(
      authData.user.id
    );
    if (data) {
      setName(data[0].name);
      setUsername(data[0].username);
      setProfilePict(data[0].profil_pict);

      let formattedRegisteredAt = format(
        new Date(data[0].created_at),
        "d MMMM yyyy",
        {
          locale: id,
        }
      );

      setRegisteredAt(formattedRegisteredAt);
    }
  }

  async function getUserPosts() {
    const { data, isError, errorMessage } = await PostService.getUserPost(
      authData.user.id
    );
    if (data) {
      setPost(data);
    }
  }

  useEffect(() => {
    getUserData();
    getUserPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    await getUserData();
    await getUserPosts();

    console.info('profile page refreshed');
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "white", height: "100%" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#FED386",
            height: 150,
            borderBottomRightRadius: "300%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: 70,
              width: 70,
              borderRadius: 15,
              marginTop: 120,
            }}
            source={
              profilePict ?
                { uri: profilePict } : require("../../../../assets/avatar-default.jpg")
            }
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Text style={styles.profileName}>{name}</Text>
          <Text style={{ color: "#AE3012", fontSize: 15 }}>@{username}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.description_post}>Post</Text>
          <Text style={styles.description_since}>Terdaftar Sejak</Text>
        </View>
        <View>
          <Text style={styles.postCount}>{posts ? posts.length : 0}</Text>
          <Text style={styles.since}>{registeredAt}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginLeft: 25, marginRight: 25 }}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.push("EditProfile",
            {
              userID: authData.user.id,
              currentName: name,
              currentProfilePict: profilePict
            }
          )}
        >
          <Text style={styles.buttonText}>Ubah Profil</Text>
        </Pressable>
      </View>
      <View style={styles.hairline} />
      <View style={{ marginTop: 25, flex: 1 }}>
        <FlashList
          numColumns={2}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <Image
              style={{
                width: 145,
                height: 145,
                borderRadius: 8,
                marginLeft: 25,
                marginBottom: 30,
              }}
              source={{ uri: item.image }}
            />
          )}
          ListEmptyComponent={<Text>No Post</Text>}
          estimatedItemSize={100}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 25,
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 200,
    // marginLeft: 30,
    // padding: 10,
  },
  profileName: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AE3012",
  },
  description_post: {
    // marginTop: 75,
    fontWeight: "500",
    marginLeft: 25,
    color: "#AE3012",
  },
  description_since: {
    marginTop: 10,
    fontWeight: "500",
    marginLeft: 25,
    color: "#AE3012",
  },
  postCount: {
    // marginTop: 75,
    marginLeft: 30,
    color: "#AE3012",
  },
  since: {
    marginTop: 10,
    marginLeft: 30,
    color: "#AE3012",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: 40,
    elevation: 3,
    backgroundColor: "#FED386",
    marginTop: 25,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#AE3012",
  },
  hairline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#AE3012",
    marginTop: 25,
    // marginLeft: 25,
    // marginRight: 25,
    height: 1,
    backgroundColor: "#AE3012",
    borderRadius: 5,
  },
});
