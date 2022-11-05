import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Text,
  Image,
  RefreshControl
} from "react-native";
import { Icon, Badge } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import * as PostService from "../../../services/PostService";

export default function TimelineScreen({ navigation }) {
  const [post, setPost] = useState();
  const [refreshing, setRefreshing] = useState(false);

  async function getAllPosts() {
    setRefreshing(true);

    const { data, isError, errorMessage } = await PostService.getAllPost();
    if (data) {
      setPost(data);
    }

    setRefreshing(false);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    await getAllPosts();

    console.info('timeline refreshed');
  }, []);

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: "white", width: "100%" }}
      showsVerticalScrollIndicator={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
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
                <Image
                  style={styles.avatar}
                  source={
                    item.user.profil_pict ?
                      { uri: item.user.profil_pict } : require("../../../../assets/avatar-default.jpg")
                  }
                />
                <Text
                  style={{
                    marginLeft: 10,
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
                      badgeStyle={{
                        borderRadius: 5,
                        backgroundColor: "#CF0A0A",
                        width: 100,
                        height: 30,
                      }}
                      value="Kehilangan"
                      status="warning"
                      textStyle={{ fontSize: 13, color: "#FFFFFF" }}
                    ></Badge>
                  ) : (
                    <Badge
                      badgeStyle={{
                        borderRadius: 5,
                        backgroundColor: "#54B435",
                        width: 100,
                        height: 30,
                      }}
                      value="Menemukan"
                      status="primary"
                      textStyle={{ fontSize: 13, color: "#FFFFFF" }}
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
                  size={15}
                ></Icon>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={(
          <Text
            style={{ textAlign: "center" }}>
            No Post
          </Text>
        )}
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
    width: 30,
    height: 30,
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
