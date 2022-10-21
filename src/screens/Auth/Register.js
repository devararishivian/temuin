import * as React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string().min(6).max(24).lowercase().trim().required(),
  name: Yup.string().min(3).max(100).trim().required(),
  email: Yup.string().email().lowercase().trim().required(),
  password: Yup.string().min(6).max(16).trim().required(),
});

export default function RegisterScreen({ navigation }) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        username: '',
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
              <TextInput
                style={styles.username}
                placeholder="Nama Pengguna"
                onChangeText={handleChange('username')}
                value={values.username}
              />
              {errors.username ? (<Text style={{ color: 'red' }}>{errors.username}</Text>) : <></>}
              <TextInput
                style={styles.name_pass}
                placeholder="Nama"
                onChangeText={handleChange('name')}
                value={values.name}

              />
              <TextInput
                style={styles.name_pass}
                placeholder="Email"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <TextInput
                style={styles.password}
                placeholder="Kata Sandi"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
              />
            </View>
            <View>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
      )}
    </Formik>
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