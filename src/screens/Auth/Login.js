import { Icon } from "@rneui/base";
import * as React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ImageBackground, ScrollView, Text, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../../assets/main-logo.png")}
        style={styles.logo}
      ></ImageBackground>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.loginText}>Masuk ke akun anda</Text>
      <View>
        <TextInput
          style={styles.username}
          placeholder="nama pengguna"
        ></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.password}
          placeholder="kata sandi"
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Masuk</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signin}>
        <Text>Tidak punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#8A4065", fontWeight: "bold" }}>
            {" "}
            Daftar sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 185,
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#8A4065",
    fontSize: 35,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 15,
    paddingTop: 10,
    color: "#8A4065",
  },
  username: {
    height: 40,
    width: 300,
    marginTop: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8A4065",
  },
  password: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8A4065",
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
});