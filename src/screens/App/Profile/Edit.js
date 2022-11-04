import { TextInput } from "react-native";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as UserService from "../../../services/UserService";
import useAuthStore from "../../../store/AuthStore";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(100).required(),
});

export default function EditProfileScreen({ route, navigation }) {
  const { userID, currentName } = route.params;
  const [image, setImage] = useState(null);
  const authData = useAuthStore((state) => state.authData);

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
        name: currentName,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        if (!image) {
          return Alert.alert("Terjadi Kesalahan", "Harap memilih gambar", [
            { text: "OK", onPress: () => { } },
          ]);
        }

        const requestBody = {
          userID: userID,
          name: values.name,
          image: image.base64,
        };

        const { isError, errorMessage } = await UserService.updateUserData(requestBody);
        if (isError) {
          setSubmitting(false);

          return Alert.alert("Terjadi Kesalahan", errorMessage, [
            { text: "OK", onPress: () => { } },
          ]);
        }

        navigation.navigate("ProfileIndex");
      }}
    >
      {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
        <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
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
                  style={{ width: 70, height: 70, borderRadius: 20 }}
                />
              </View>
            ) : (
              <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: "#AE3012",
                borderRadius: 15,
              }}
            ></View>
            )}
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.description_post}>Nama</Text>
              <Text style={styles.description_since}>Foto Profil</Text>
            </View>
            <View>
              <TextInput
                style={styles.username_edit}
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                onChangeText={handleChange('name')}
                value={values.name}
              />
              {errors.name ? (
                <Text style={styles.textInputErrorMessage}>
                  {errors.name}
                </Text>
              ) : (
                <></>
              )}
              <Button
                color="#FED386"
                style={{
                  backgroundColor: "#FED386",
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  width: 250,
                }}
                title={!image ? "Pilih dari galeri" : "Ubah gambar"}
                onPress={pickImage}
                titleStyle={{
                  color: "#AE3012",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginLeft: 25,
              marginRight: 25,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={{
                width: 100,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#FED386",
              }}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                  color: "#AE3012",
                }}
              >
                {isSubmitting ? <ActivityIndicator /> : "SIMPAN"}
              </Text>
            </Pressable>
          </View>
        </View>
      )
      }
    </Formik >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
    // backgroundColor: "red",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // height: "100%",
  },
  description_post: {
    // marginTop: 75,
    fontWeight: "500",
    marginLeft: 25,
    color: "#AE3012",
  },
  description_since: {
    marginTop: 30,
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
  username_edit: {
    height: 30,
    width: 250,
    marginLeft: 10,
    // padding: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#AE3012",
    // borderColor: "#8A4065",
    // backgroundColor: "#FFE3B2",
  },
  textInputErrorMessage: {
    color: "red",
    paddingLeft: 10,
  },
});
