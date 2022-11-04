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
    <ScrollView
      style={{ height: "100%", backgroundColor: "white", width: "100%" }}
      showsVerticalScrollIndicator={false}
    >
      <FlashList
        numColumns={1}
        horizontal={false}
        data={post}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "#AE3012",
                    borderRadius: 10,
                  }}
                ></View>
                {/* <Image
                  style={styles.avatar}
                  source={require("../../../../assets/avatar-profile.png")}
                /> */}
                <Text
                  style={{
                    paddingLeft: 6,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#AE3012",
                  }}
                >
                  {item.user.name}
                </Text>
                <View
                  style={{
                    alignItems: "flex-end",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  {item.is_looking_for ? (
                    <Badge
                      // style={{ marginLeft: "auto" }}
                      badgeStyle={{
                        borderRadius: 5,
                        backgroundColor: "#CF0A0A",
                        width: 80,
                        height: 30,
                      }}
                      value="Kehilangan"
                      status="warning"
                      textStyle={{ fontSize: 13, color: "#FFB200" }}
                    />
                  ) : (
                    <Badge
                      // style={{ marginLeft: "auto" }}
                      badgeStyle={{
                        borderRadius: 5,
                        backgroundColor: "#54B435",
                        width: 80,
                        height: 30,
                      }}
                      value="Menemukan"
                      status="primary"
                      textStyle={{ fontSize: 13, color: "#E1FFB1" }}
                    />
                  )}
                </View>
              </View>
              <Image style={styles.cardImage} source={{ uri: item.image }} />
              <Text style={styles.cardText}>
                Keterangan :{" "}
                <Text style={{ fontWeight: "normal" }}>{item.title}</Text>
              </Text>
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.push("DetailTimeline", { post: item })
                }
              >
                <Text style={styles.buttonText}>Detail Informasi</Text>
                <Icon
                  type="ionicon"
                  name="ios-open-outline"
                  color={"#AE3012"}
                  size={"15"}
                  containerStyle={{}}
                ></Icon>
              </Pressable>
            </View>
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#FED386",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  container: {
    marginTop: 20,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
  },
  cardImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardText: {
    paddingVertical: 10,
    fontWeight: "bold",
    // padding: 10,
    fontSize: 15,
  },
  buttonText: {
    color: "#AE3012",
    fontWeight: "bold",
    marginRight: 10,
  },
});
