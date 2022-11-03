import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { Image, Button, Input } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as PostService from "../../../services/PostService";
import usePostStore from "../../../store/PostStore";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../store/AuthStore";

const schema = Yup.object().shape({
  title: Yup.string().max(100).required(),
  description: Yup.string().required(),
});

export default function NewPostFormScreen() {
  const authData = useAuthStore((state) => state.authData);
  const navigation = useNavigation();
  const selectedPostType = usePostStore((state) => state.selectedPostType);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        if (!image) {
          return Alert.alert("Terjadi Kesalahan", "Harap memilih gambar", [
            { text: "OK", onPress: () => {} },
          ]);
        }

        const requestBody = {
          title: values.title,
          description: values.description,
          isLookingFor: selectedPostType,
          image: image.base64,
        };

        const { isError, errorMessage } = await PostService.newPost(
          requestBody,
          authData
        );
        // TODO: nilai dari isError ini nyantol. Jika percobaan newpost pertama gagal, lalu kedua berhasil,
        // maka isError tetap ada valuenya. Ini berlaku saat login dan register juga
        if (isError) {
          setSubmitting(false);

          return Alert.alert("Terjadi Kesalahan", errorMessage, [
            { text: "OK", onPress: () => {} },
          ]);
        }

        navigation.navigate("Timeline");
      }}
    >
      {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
        <View
          //   contentContainerStyle={styles.container}
          //   showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#AE3012", width: "100%", height: "100%" }}
        >
          <View
            style={{
              backgroundColor: "#FED386",
              width: "100%",
              height: 220,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TextInput
                placeholder="Judul Post"
                autoCorrect={false}
                autoComplete="off"
                multiline={true}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholderTextColor={"#EB7658"}
              />
              {errors.title ? (
                <Text style={styles.textInputErrorMessage}>{errors.title}</Text>
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                marginBottom: 10,
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TextInput
                placeholder="Deskripsi Post"
                autoCorrect={false}
                autoComplete="off"
                multiline={true}
                numberOfLines={2}
                onChangeText={handleChange("description")}
                value={values.description}
                placeholderTextColor={"#EB7658"}
              />
              {errors.description ? (
                <Text style={styles.textInputErrorMessage}>
                  {errors.description}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>

          <View style={{ paddingHorizontal: 10, width: "100%" }}>
            <View style={{ alignItems: "center", paddingVertical: 10 }}>
              <Text
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFE0",
                }}
              >
                Pilih gambar untuk dibagikan
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Button
                // type="outline"
                color="#FED386"
                style={{
                  // borderColor: "#FED386",
                  // borderWidth: 3,
                  backgroundColor: "#FED386",
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // size="sm"
                title={!image ? "Pilih dari galeri" : "Ubah gambar"}
                onPress={pickImage}
                titleStyle={{
                  color: "#AE3012",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              />
            </View>
            {image ? (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 40,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 300, height: 300, borderRadius: 20 }}
                />
              </View>
            ) : (
              ""
            )}
          </View>
          <Button
            // type="outline"
            color="#FFFFE0"
            style={{
              // borderColor: "#FED386",
              // borderWidth: 3,
              backgroundColor: "#FFFFE0",
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSubmit}
            disabled={isSubmitting}
            title={isSubmitting ? <ActivityIndicator /> : "Bagikan"}
            titleStyle={{
              color: "#AE3012",
              fontSize: 15,
              fontWeight: "bold",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 20,
    // paddingHorizontal: 5,
  },
  viewUpload: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upload: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonTitle: {
    color: "white",
  },
  item: {
    aspectRatio: 1,
    height: 350,
    borderColor: "#8A4065",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  judul_post: {
    height: 50,
    width: 350,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#8A4065",
    textAlignVertical: "top",
  },
  deskripsi: {
    height: 200,
    width: 350,
    margin: 10,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#8A4065",
    textAlignVertical: "top",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 150,
    height: 40,
    elevation: 3,
    backgroundColor: "#E1CBCF",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  signin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  textInputErrorMessage: {
    color: "red",
    paddingLeft: 10,
  },
});
