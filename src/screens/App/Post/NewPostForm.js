import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image, Button, Input } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as PostService from '../../../services/PostService';

const schema = Yup.object().shape({
    title: Yup.string().max(100).required(),
    description: Yup.string().required(),
});

export default function NewPostFormScreen({ navigation }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handlePost = async (values, setSubmitting) => {
        setSubmitting(true);

        const requestBody = {
            title: values.title,
            description: values.description,
        }

        const { isError, errorMessage } = await PostService.insertPostData(requestBody);
        if (isError) {
            setSubmitting(false);

            return Alert.alert(
                "Terjadi Kesalahan",
                loginErrMsg,
                [
                    { text: "OK", onPress: () => setIsLoginError(false) }
                ]
            );
        }

        navigation.popToTop();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={(values, { setSubmitting }) => handlePost(values, setSubmitting)}
        >
            {({ handleChange, handleSubmit, setValues, values, isSubmitting, errors }) => (
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <Input
                        placeholder='Judul Post'
                        autoCorrect={false}
                        autoComplete="off"
                        multiline={true}
                        onChangeText={handleChange('title')}
                        value={values.title}
                    />
                    <Input
                        placeholder='Deskripsi Post'
                        autoCorrect={false}
                        autoComplete="off"
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={handleChange('description')}
                        value={values.description}
                    />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Pilih gambar untuk dibagikan</Text>
                        <Button
                            type="outline"
                            color="primary"
                            style={{ marginBottom: 20 }}
                            title={!image ? 'Pilih dari galeri' : 'Ubah gambar'}
                            onPress={pickImage} />
                        {
                            image ?
                                <View style={{ paddingHorizontal: 10, paddingVertical: 40, alignItems: 'center' }}>
                                    <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                                </View>
                                : ''}
                    </View>
                    {/* <View style={styles.button}>
                        <Button size="sm" title="Upload Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage} />
                    </View>
                    <View style={styles.button}>
                        <Button size="sm" title="Remove Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage} />
                    </View> */}
                </ScrollView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 5,
    },
    viewUpload: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonTitle: {
        color: 'white',
    },
    item: {
        aspectRatio: 1,
        height: 350,
        borderColor: "#8A4065",
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    judul_post: {
        height: 50,
        width: 350,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: "#8A4065",
        textAlignVertical: 'top',
    },
    deskripsi: {
        height: 200,
        width: 350,
        margin: 10,
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: "#8A4065",
        textAlignVertical: 'top',
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