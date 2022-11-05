import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Icon, Divider, Badge } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlashList } from "@shopify/flash-list";
import * as CommentService from "../../../services/CommentService";
import useAuthStore from "../../../store/AuthStore";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const schema = Yup.object().shape({
  comment: Yup.string().required(),
});

export default function DetailTimelineScreen({ route, navigation }) {
  const { post } = route.params;
  const authData = useAuthStore((state) => state.authData);
  const [postComments, setPostComments] = useState();
  const [refreshing, setRefreshing] = useState(false);

  async function getAllCommentByPostID() {
    const { data, isError, errorMessage } =
      await CommentService.getAllCommentByPostID(post.id);
    if (data) {
      let formatedData = [];
      data.forEach((element) => {
        let formattedCommentTime = format(
          new Date(element.created_at),
          "dd MMMM yyyy HH:mm",
          {
            locale: id,
          }
        );
        formatedData.push({
          comment: element.comment,
          created_at: formattedCommentTime,
          id: element.id,
          post_id: element.post_id,
          user: {
            name: element.user.name,
            profilePict: element.user.profil_pict
          },
          user_id: element.user_id,
        });
      });

      setPostComments(formatedData);
    }
  }

  useEffect(() => {
    getAllCommentByPostID();
  }, []);

  const onRefresh = useCallback(async () => {
    await getAllCommentByPostID();

    console.info('comment(s) refreshed');
  }, []);

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        comment: "",
      }}
      onSubmit={async (values, { setSubmitting, setValues }) => {
        setSubmitting(true);
        const requestBody = {
          userId: authData.user.id,
          postId: post.id,
          comment: values.comment,
        };

        const { isError, errorMessage } = await CommentService.insertComment(
          requestBody
        );

        if (isError) {
          setSubmitting(false);

          return Alert.alert("Terjadi Kesalahan", errorMessage, [
            { text: "OK", onPress: () => { } },
          ]);
        }
        setValues("comment", "");
        onRefresh();
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues,
        values,
        isSubmitting,
        errors,
      }) => (
        <View>
          <ScrollView
            style={{ backgroundColor: "white", height: "93%" }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image
                style={styles.avatar}
                source={
                  post.user.profil_pict ?
                    { uri: post.user.profil_pict } : require("../../../../assets/avatar-default.jpg")
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
                {post.user.name}
              </Text>
              <View
                style={{
                  alignItems: "flex-end",
                  width: "100%",
                  position: "absolute",
                }}
              >
                {post.is_looking_for ? (
                  <Badge
                    badgeStyle={{
                      marginRight: 10,
                      borderRadius: 5,
                      backgroundColor: "#CF0A0A",
                      width: 100,
                      height: 30,
                    }}
                    value="Kehilangan"
                    status="warning"
                    textStyle={{ fontSize: 13, color: "#FFFFFF" }}
                  />
                ) : (
                  <Badge
                    // style={{ marginLeft: "auto" }}
                    badgeStyle={{
                      marginRight: 10,
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
            <Text style={styles.cardTextDescTittle}>{post.title}</Text>
            <Image style={styles.cardImage} source={{ uri: post.image }} />
            <Text style={styles.cardTextDescTittle}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Deskripsi :{" "}
              </Text>
              {post.description}
            </Text>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} width={2} />
            <FlashList
              numColumns={1}
              horizontal={false}
              data={postComments}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <Image
                    style={styles.commentAvatar}
                    source={
                      item.user.profilePict ?
                        { uri: item.user.profilePict } : require("../../../../assets/avatar-default.jpg")
                    }
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      backgroundColor: "#EAEAEA",
                      marginLeft: 5,
                      width: "90%",
                      borderRadius: 5,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#252525",
                      }}
                    >
                      {item.user.name}
                    </Text>
                    <View
                      style={{
                        // alignItems: "flex-end",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        marginTop: 12,
                      }}
                    >
                      <View
                        style={{
                          // flexDirection
                          alignItems: "flex-end",
                          // justifyContent: "flex-end",
                          // height: "100%",
                          // backgroundColor: "red",
                        }}
                      >
                        <Text style={styles.dateText}>{item.created_at}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.cardText}>{item.comment}</Text>
                    </View>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <Text style={{ padding: 10 }}>Belum ada komentar</Text>
              }
              estimatedItemSize={100}
            />
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F9F9F9",
              borderTopWidth: 0.2,
              borderBottomWidth: 0.2,
              borderTopColor: "#FAF7F0",
              borderBottomColor: "#FAF7F0",
            }}
          >
            <TextInput
              style={styles.comment}
              placeholder="Beri tanggapan"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              onChangeText={(v) => {
                setFieldValue("comment", v.toLowerCase());
              }}
              value={values.comment}
            />
            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={styles.button}
            >
              <Text style={{ color: "#252525" }}>
                {isSubmitting ? <ActivityIndicator /> : "Kirim"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginLeft: 10
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  cardImage: {
    // marginTop: 10,
    width: "100%",
    height: 400,
    resizeMode: "cover",
    // marginLeft: 10,
    // marginRight: 10,
  },
  cardText: {
    // padding: 10,
    marginTop: 10,
    fontSize: 15,
    color: "#252525",
  },
  dateText: {
    fontSize: 9.5,
  },
  comment: {
    width: "90%",
    height: 50,
    alignItems: "center",
    padding: 10,
    // marginTop: 5,
    justifyContent: "center",
  },
  cardTextDescTittle: {
    padding: 10,
    fontSize: 15,
    color: "#252525",
    textAlign: "justify"
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20
    // justifyContent: "center",
    // alignItems: "center",
  },
});
