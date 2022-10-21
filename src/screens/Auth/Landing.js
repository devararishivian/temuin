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
        source={require("../../../assets/main-logo.png")}
        style={styles.logo}
      ></ImageBackground>
      <Text style={styles.wellcomeText}>Wellcome to Temuin
      </Text>
      <Text style={styles.descripton}>"Netizen Temuin siap bantu cari barang mu yang hilang"
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
    marginTop : 120,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 225,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 150,
    height: 60,
    elevation: 3,
    backgroundColor: "#E1CBCF",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "white",
  },
  descripton:{
    fontSize: 20,
    letterSpacing: 0.25,
    color: "#8A4065",
    textAlign:'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    marginBottom: 40,
    fontStyle:"italic",
  },
  wellcomeText :{
    fontWeight: "bold",
    color: "#8A4065",
    fontSize: 40,
    marginTop: 50,
  }
});