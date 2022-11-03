import { TextInput } from "react-native";
import { Pressable, Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useState } from "react";

export default function EditProfileScreen({ navigation }) {
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
    <>
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#AE3012", fontWeight: "bold", fontSize: 20 }}>
          Edit Profile Screen
        </Text>
      </View> */}
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
          <View
            style={{
              height: 70,
              width: 70,
              backgroundColor: "#AE3012",
              borderRadius: 15,
              //   marginTop: 120,
            }}
          ></View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.description_post}>Nama</Text>
            <Text style={styles.description_since}>Foto Profil</Text>
          </View>
          <View>
            <TextInput style={styles.username_edit}></TextInput>
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
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                width: 250,
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
            {/* <Text style={styles.since}>666</Text> */}
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
          {/* <Pressable
            style={{
              width: 100,
              height: 40,
              backgroundColor: "#FED386",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginRight: 10,
            }}
            onPress={() => navigation.goBack()}
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
              KELUAR
            </Text>
          </Pressable> */}
          <Pressable
            style={{
              width: 100,
              height: 40,
              //   backgroundColor: "#FED386",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#FED386",

              // marginLeft: 20,
              // marginRight: 20,
            }}
            //   onPress={() => navigation.goBack()}
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
              SIMPAN
            </Text>
          </Pressable>
        </View>
      </View>
    </>
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
});
