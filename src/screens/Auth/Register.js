import {
  KeyboardAvoidingView,
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
  username: Yup.string().min(6).max(24).required(),
  name: Yup.string().min(3).max(100).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(16).required(),
});

export default function RegisterScreen({ navigation }) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        username: "",
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        const { isError, errorMessage } = await AuthService.register(values);

        if (isError) {
          setSubmitting(false);

          return Alert.alert("Terjadi Kesalahan", errorMessage, [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        isSubmitting,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <View
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <ImageBackground
              source={require("../../../assets/register-screen.png")}
              style={styles.logo}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                {/* <Text style={styles.welcomeText}>
                  Selamat datang di Temuin !
                </Text> */}
                {/* <Text style={styles.loginText}>Daftarkan diri anda</Text> */}
                <View>
                  <TextInput
                    style={styles.username}
                    placeholder="Nama Pengguna"
                    autoCorrect={false}
                    autoComplete="off"
                    autoCapitalize="none"
                    onChangeText={(v) => {
                      setFieldValue("username", v.toLowerCase());
                    }}
                    value={values.username}
                  />
                  {errors.username ? (
                    <Text style={styles.textInputErrorMessage}>
                      {errors.username}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <TextInput
                    style={styles.name_pass}
                    placeholder="Nama"
                    autoCorrect={false}
                    autoComplete="off"
                    autoCapitalize="none"
                    onChangeText={handleChange("name")}
                    value={values.name}
                  />
                  {errors.name ? (
                    <Text style={styles.textInputErrorMessage}>
                      {errors.name}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <TextInput
                    style={styles.name_pass}
                    placeholder="Email"
                    autoCorrect={false}
                    autoComplete="off"
                    autoCapitalize="none"
                    onChangeText={(v) => {
                      setFieldValue("email", v.toLowerCase());
                    }}
                    value={values.email}
                  />
                  {errors.email ? (
                    <Text style={styles.textInputErrorMessage}>
                      {errors.email}
                    </Text>
                  ) : (
                    <></>
                  )}
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
                <View>
                  <Pressable
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    style={styles.button}
                  >
                    <Text style={styles.text}>
                      {isSubmitting ? <ActivityIndicator /> : "Daftar"}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.signup}>
                  <Text style={{ color: "#AE3012" }}>Sudah punya akun ?</Text>
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "#FFE3B2", fontWeight: "bold" }}>
                      {" "}
                      Masuk
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#8A4065",
    fontSize: 28,
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
    marginTop: 100,
    margin: 10,
    padding: 10,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#FFE3B2",
    backgroundColor: "#FFE3B2",
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
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#8A4065",
    backgroundColor: "#FFE3B2",
  },
  keyboard: {
    flex: 1,
  },
  textInputErrorMessage: {
    color: "red",
    paddingLeft: 20,
  },
});
