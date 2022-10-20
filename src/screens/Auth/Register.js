import * as React from "react";
import { KeyboardAvoidingView, Pressable, TextInput, View } from "react-native";
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
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../../assets/main-logo.png")}
          style={styles.logo}
        ></ImageBackground>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Create your account</Text>
        <View>
          <TextInput style={styles.username} placeholder="username"></TextInput>
          <TextInput style={styles.name_pass} placeholder="name"></TextInput>
          <TextInput style={styles.name_pass} placeholder="email"></TextInput>
          <TextInput
            style={styles.password}
            placeholder="password"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.signup}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "purple", fontWeight: "bold" }}>
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
  },
});