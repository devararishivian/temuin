import * as React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Pressable
} from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as AuthService from '../../services/AuthService';

const schema = Yup.object().shape({
  username: Yup.string().min(6).max(24).lowercase().trim().required(),
  name: Yup.string().min(3).max(100).trim().required(),
  email: Yup.string().email().lowercase().trim().required(),
  password: Yup.string().min(6).max(16).trim().required(),
});

export default function RegisterScreen({ navigation }) {
  const handleRegister = async (values, setSubmitting) => {
    setSubmitting(true);

    const { isError, errorMessage } = await AuthService.register(values);
    console.log(isError);
    console.log(errorMessage);

    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        username: '',
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => handleRegister(values, setSubmitting)}
    >
      {({ handleChange, handleBlur, handleSubmit, setSubmitting, values, isSubmitting, errors }) => (
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
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                onChangeText={handleChange('username')}
                value={values.username}
              />
              {errors.username ? (<Text style={styles.textInputErrorMessage}>{errors.username}</Text>) : <></>}
              <TextInput
                style={styles.name_pass}
                placeholder="Nama"
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                onChangeText={handleChange('name')}
                value={values.name}
              />
              {errors.name ? (<Text style={styles.textInputErrorMessage}>{errors.name}</Text>) : <></>}
              <TextInput
                style={styles.name_pass}
                placeholder="Email"
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.email ? (<Text style={styles.textInputErrorMessage}>{errors.email}</Text>) : <></>}
              <TextInput
                style={styles.password}
                placeholder="Kata Sandi"
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              {errors.password ? (<Text style={styles.textInputErrorMessage}>{errors.password}</Text>) : <></>}
            </View>
            <View>
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.text}>{isSubmitting ? 'Mendaftarkan...' : 'Daftar'}</Text>
              </Pressable>
            </View>
            <View style={styles.signup}>
              <Text>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#8A4065", fontWeight: "bold" }}>
                  {" "}
                  Sign in here
                </Text>
              </Pressable>
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
  textInputErrorMessage: {
    color: 'red',
    paddingLeft: 20,
  }
});