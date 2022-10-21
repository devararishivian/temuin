import * as React from 'react';
import { Button, View, Text, ImageBackground, StyleSheet} from 'react-native';


export default function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground
        source={require("../../../assets/main-logo.png")}
        style={styles.logo}
      ></ImageBackground>
      <Text>Landing Screen</Text>
      <Text>Temuin lahir dari sebuah masalah yang dialami berbagai kalangan masyarakat. Kehilangan sesuatu merupakan hal yang tidak diharapkan oleh siapapun. Seringkali kita tidak begitu saja mengikhlaskan apa yang telah hilang, namun mencoba untuk berikhtiar dalam menemukan kembali. Tak jarang kita jumpai postingan di berbagai sosmed seperti status WhatsApp, cerita Instagram, grup facebook, dan sebagainya mengenai barang maupun hewan peliharaan yang hilang. Tiang listrik dan tembok sebuah bangunan juga tak luput menjadi sasaran untuk menempel poster pengumuman kehilangan.
      </Text>
      <Text>Disini nantinya akan mengarahkan ke Login / register jika belum login</Text>

      <Button
        title="Mulai"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
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