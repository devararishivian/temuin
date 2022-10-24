import * as React from "react";
import {
    TextInput,
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid,
  } from "react-native";
import { Image,Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
export default () => {
    const [pic,SetPic] = React.useState('');
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  

    return (
            <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
            >
               <View>
                <TextInput
                  style={styles.deskripsi}
                  placeholder="Deskripsi postingan"
                  autoCorrect={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={10}
                />
              </View>
              <View style={styles.viewUpload}>
                    <Button color="error" title="Unggah Gambar" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>
                {/* <View style={styles.button}>
                    <Button size="sm" title="Upload Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage}/>
                </View>
                <View style={styles.button}>
                    <Button size="sm" title="Remove Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage}/>
                </View> */}
            </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 0,
      alignItems: "center",
    },
    logo: {
      width: 200,
      height: 185,
    },
    viewUpload:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    upload: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
      },
    buttonTitle:{
        color:'white',
    },
    item:{
      aspectRatio: 1,
      height: 350,
      borderColor:"#8A4065",
      overflow:'hidden',
      justifyContent: "center",
      alignItems:"center",
      borderWidth: 1,
    },
    deskripsi: {
      height: 200,
      width: 350,
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 0,
      borderColor: "#8A4065",
      textAlignVertical:'top',
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