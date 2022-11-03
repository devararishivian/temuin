import { useState, useEffect } from "react";
import * as React from "react";
import {
  Button,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon, Badge } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import * as PostService from "../../../services/PostService";

export default function TimelineScreen({ navigation }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getAllPosts() {
      const { data, isError, errorMessage } = await PostService.getAllPost();
      if (data) {
        setPost(data);
      }
    }

    getAllPosts();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#F8F9FD", height: "100%" }}>
      <FlashList
        numColumns={1}
        horizontal={false}
        data={post}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../../../../assets/avatar-profile.png")}
                />
                <Text style={{ paddingLeft: 6 }}>{item.user.name}</Text>
                {item.is_looking_for ? (
                  <Badge
                    style={{ marginLeft: "auto" }}
                    value="Kehilangan"
                    status="warning"
                  />
                ) : (
                  <Badge
                    style={{ marginLeft: "auto" }}
                    value="Menemukan"
                    status="primary"
                  />
                )}
              </View>
              <Image style={styles.cardImage} source={{ uri: item.image }} />
              <Text style={styles.cardText}>{item.title}</Text>
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.push("DetailTimeline", { post: item })
                }
              >
                <Text style={styles.buttonText}>Detail Informasi</Text>
                <Icon type="ionicon" name="ios-open-outline"></Icon>
              </Pressable>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No Post</Text>}
        estimatedItemSize={100}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    borderRadius: 3,
    elevation: 3,
    backgroundColor: "#EAEAEA",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    padding: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  container: {
    marginTop: 20,
    backgroundColor: "#f5cff",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
});
