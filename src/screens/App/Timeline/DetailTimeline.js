import { View } from "react-native";
import { useState, useEffect } from "react";
import * as React from "react";
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  div,
} from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlashList } from "@shopify/flash-list";
import * as CommentService from "../../../services/CommentService";
import useAuthStore from "../../../store/AuthStore";

const schema = Yup.object().shape({
  comment: Yup.string().required(),
});

export default function DetailTimelineScreen({ route, navigation }) {
  const { item } = route.params;
  const authData = useAuthStore((state) => state.authData);
  const [comment, setComment] = React.useState([]);
  useEffect(() => {
    async function getAllCommentByPostId() {
      const { data, isError, errorMessage } =
        await CommentService.getAllCommentByPostId(item.id);
      if (data) {
        setComment(data);
      }
    }

    getAllCommentByPostId();
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
          postId: item.id,
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
          <ScrollView style={{ backgroundColor: "#F8F9FD", height: "90%" }}>
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
                <Icon
                  style={{ marginLeft: "auto" }}
                  type="antdesign"
                  name="questioncircle"
                  color="black"
                />
              ) : (
                <Icon
                  style={{ marginLeft: "auto" }}
                  type="ionicon"
                  name="information-circle"
                  color="black"
                />
              )}
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
            <Image style={styles.cardImage} source={{ uri: item.image }} />
            <Text style={styles.cardText}>{item.description}</Text>
            <Divider width={4} />
            <FlashList
              numColumns={1}
              horizontal={false}
              data={comment}
              renderItem={({ item }) => (
                <View style={styles.container}>
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
                  </View>
                  <Text style={styles.cardText}>{item.comment}</Text>
                </View>
              )}
              ListEmptyComponent={<Text>No Post</Text>}
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
              <Icon type="feather" name="send" color="black" />
            </Pressable>
          </View>

          <Pressable onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
          </Pressable>
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
  comment: {
    width: "93%",
    height: 50,
  },
});
