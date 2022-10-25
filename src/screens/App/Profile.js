import { Button } from "@rneui/base";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/avatar-profile.png")}
        ></Image>
        <Text style={styles.profileName}>Saman Brembo</Text>
        <View>
          <Text style={styles.description_post}>Post</Text>
          <Text style={styles.description_since}>Terdaftar Sejak</Text>
        </View>
        <View>
          <Text style={styles.postCount}>6</Text>
          <Text style={styles.since}>13 Jan 2022</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginLeft: 30, marginRight: 30 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hairline} />
      <View style={{ alignItems: "center", marginTop: 180 }}>
        <Text
          style={{
            fontSize: 50,
            letterSpacing: 2,
            color: "#8A4065",
            fontStyle: "italic",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          "lanjut mene, ngasuh dulu"
        </Text>
        {/* <FlatList></FlatList> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: 30,
    padding: 10,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 35,
    marginLeft: 155,
    position: "absolute",
    color: "#8A4065",
  },
  description_post: {
    marginTop: 75,
    fontWeight: "450",
    marginLeft: 25,
    color: "#8A4065",
  },
  description_since: {
    marginTop: 10,
    fontWeight: "450",
    marginLeft: 25,
    color: "#8A4065",
  },
  postCount: {
    marginTop: 75,
    marginLeft: 30,
    color: "#8A4065",
  },
  since: {
    marginTop: 10,
    marginLeft: 30,
    color: "#8A4065",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "100%",
    height: 40,
    elevation: 3,
    backgroundColor: "#E1CBCF",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#8A4065",
  },
  hairline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#8A4065",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    height: 2,
    backgroundColor: "#8A4065",
    borderRadius: 5,
  },
});
