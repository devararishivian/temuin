import * as React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/landing-screen.png")}
        style={styles.logo}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.text}>MULAI</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={styles.welcomeText}>Selamat datang di Temuin</Text>
      <Text style={styles.descripton}>
        "Netizen Temuin siap bantu cari barang mu yang hilang"
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 200,
    height: 60,
    // elevation: 3,
    backgroundColor: "#FFE3B2",
    marginBottom: 50,
  },
  text: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#AE3012",
  },
  descripton: {
    fontSize: 20,
    letterSpacing: 0.25,
    color: "#8A4065",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    marginBottom: 40,
    fontStyle: "italic",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#8A4065",
    fontSize: 30,
    marginTop: 50,
  },
});
