import {
  TextInput,
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as AuthService from '../../services/AuthService';

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default function LoginScreen({ navigation }) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        {
          setSubmitting(true);

          const { isError, errorMessage } = await AuthService.login(values);

          if (isError) {
            setSubmitting(false);

            return Alert.alert(
              "Terjadi Kesalahan",
              errorMessage,
              [
                { text: "OK", onPress: () => { } }
              ]
            );
          }
        }
      }}
    >
      {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
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
              style={styles.name_pass}
              placeholder="Email"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {errors.email ? (<Text style={styles.textInputErrorMessage}>{errors.email}</Text>) : <></>}
          </View>
          <View>
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
            <Pressable onPress={handleSubmit} disabled={isSubmitting} style={styles.button}>
              <Text style={styles.text}>{isSubmitting ? <ActivityIndicator /> : 'Masuk'}</Text>
            </Pressable>
          </View>
          <View style={styles.signin}>
            <Text>Tidak punya akun?</Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#8A4065", fontWeight: "bold" }}>
                {" "}
                Daftar sekarang
              </Text>
            </Pressable>
          </View>
        </ScrollView>
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
  name_pass: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8A4065",
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
  textInputErrorMessage: {
    color: 'red',
    paddingLeft: 20,
  }
});