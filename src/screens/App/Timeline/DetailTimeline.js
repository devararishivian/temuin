import { useState, useEffect } from "react";
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

  useEffect(() => {
    async function getAllCommentByPostID() {
      const { data, isError, errorMessage } =
        await CommentService.getAllCommentByPostID(post.id);
      if (data) {
        let formatedData = [];
        data.forEach((element) => {
          let formattedCommentTime = format(
            new Date(element.created_at),
            "d MMMM yyyy HH:mm:ss",
            {
              locale: id,
            }
          );
          formatedData.push({
            comment: element.comment,
            created_at: formattedCommentTime,
            id: element.id,
            post_id: element.post_id,
            user: { name: element.user.name },
            user_id: element.user_id,
          });
        });

        setPostComments(formatedData);
      }
    }

    getAllCommentByPostID();
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
            { text: "OK", onPress: () => {} },
          ]);
        }
        setValues("comment", "");
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
          <ScrollView style={{ backgroundColor: "#F8F9FD", height: "93%" }}>
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
              <Text style={{ paddingLeft: 6 }}>{post.user.name}</Text>
              {post.is_looking_for ? (
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
            <Text style={styles.cardText}>{post.title}</Text>
            <Image style={styles.cardImage} source={{ uri: post.image }} />
            <Text style={styles.cardText}>{post.description}</Text>
            <Divider width={4} />
            <FlashList
              numColumns={1}
              horizontal={false}
              data={postComments}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <Image
                    style={styles.avatar}
                    source={require("../../../../assets/avatar-profile.png")}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      backgroundColor: "#EAEAEA",
                      marginLeft: 5,
                      width: "88%",
                    }}
                  >
                    <Text style={{ paddingLeft: 6 }}>{item.user.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.cardText}>{item.comment}</Text>
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexDirection: "column",
                        }}
                      >
                        <Text style={styles.dateText}>{item.created_at}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text>No Comment</Text>}
              estimatedItemSize={100}
            />
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <TextInput
              style={styles.comment}
              placeholder="comment..."
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
              <Text style={styles.text}>
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
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  cardImage: {
    marginTop: 10,
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
  dateText: {
    fontSize: 9,
  },
  comment: {
    width: "90%",
    height: 50,
    alignItems: "center",
  },
  text: {},
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
});
