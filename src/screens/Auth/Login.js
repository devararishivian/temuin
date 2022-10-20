import * as React from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import { ImageBackground, ScrollView, Text, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
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
      <Text style={styles.loginText}>Login to your account</Text>
      <View>
        <TextInput style={styles.username} placeholder="username"></TextInput>
        <TextInput
          style={styles.password}
          placeholder="password"
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
      </View>
      <View style={styles.signin}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "purple", fontWeight: "bold" }}>
            {" "}
            Sign up here
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
    fontSize: 35,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 15,
    paddingTop: 10,
  },
  username: {
    height: 40,
    width: 300,
    marginTop: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  password: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 150,
    height: 40,
    elevation: 3,
    backgroundColor: "black",
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