import * as React from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import {
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboard}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../../assets/main-logo.png")}
          style={styles.logo}
        ></ImageBackground>
        <Text style={styles.welcomeText}>Welcome to Temuin!</Text>
        <Text style={styles.loginText}>Daftarkan diri anda</Text>
        <View>
          <TextInput style={styles.username} placeholder="nama pengguna"></TextInput>
          <TextInput style={styles.name_pass} placeholder="nama"></TextInput>
          <TextInput style={styles.name_pass} placeholder="email"></TextInput>
          <TextInput
            style={styles.password}
            placeholder="kata sandi"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Daftar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#8A4065", fontWeight: "bold" }}>
              {" "}
              Sign in here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  signup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  name_pass: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8A4065",
    },
  keyboard: {
    flex: 1,
  },
});