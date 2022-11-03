import {
  TextInput,
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as AuthService from "../../services/AuthService";

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default function LoginScreen({ navigation }) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        {
          setSubmitting(true);

          const { isError, errorMessage } = await AuthService.login(values);

          if (isError) {
            setSubmitting(false);

            return Alert.alert("Terjadi Kesalahan", errorMessage, [
              { text: "OK", onPress: () => {} },
            ]);
          }
        }
      }}
    >
      {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
        <View
          // contentContainerStyle={styles.container}
          // showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <ImageBackground
            source={require("../../../assets/login-screen.png")}
            style={styles.logo}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {/* <Text style={styles.welcomeText}>Welcome Back!</Text> */}
              {/* <Text style={styles.loginText}>Masuk ke akun anda</Text> */}
              <View>
                <TextInput
                  style={styles.name_pass}
                  placeholder="Email"
                  autoCorrect={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={styles.textInputErrorMessage}>
                    {errors.email}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View>
                <TextInput
                  style={styles.password}
                  placeholder="Kata Sandi"
                  autoCorrect={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  value={values.password}
                />
                {errors.password ? (
                  <Text style={styles.textInputErrorMessage}>
                    {errors.password}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Pressable
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={styles.button}
                >
                  <Text style={styles.text}>
                    {isSubmitting ? <ActivityIndicator /> : "Masuk"}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.signin}>
                <Text style={{ color: "#AE3012" }}>Belum punya akun ?</Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={{ color: "#AE3012", fontWeight: "bold" }}>
                    {" "}
                    Daftar sekarang
                  </Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    // width: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#8A4065",
    fontSize: 35,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 40,
    // marginTop: 30,
    color: "#AE3012",
  },
  name_pass: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#8A4065",
    backgroundColor: "#FFE3B2",
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
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#8A4065",
    backgroundColor: "#FFE3B2",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 150,
    height: 40,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#AE3012",
  },
  signin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  textInputErrorMessage: {
    color: "red",
    paddingLeft: 20,
  },
});
