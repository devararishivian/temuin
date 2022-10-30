import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Image, Button, Input } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as PostService from '../../../services/PostService';
import usePostStore from '../../../store/PostStore';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from "../../../store/AuthStore";

const schema = Yup.object().shape({
    title: Yup.string().max(100).required(),
    description: Yup.string().required(),
});

export default function NewPostFormScreen() {
    const authData = useAuthStore(state => state.authData);
    const navigation = useNavigation();
    const selectedPostType = usePostStore(state => state.selectedPostType);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                if (!image) {
                    return Alert.alert(
                        "Terjadi Kesalahan",
                        "Harap memilih gambar",
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }

                const requestBody = {
                    title: values.title,
                    description: values.description,
                    isLookingFor: selectedPostType,
                    image: image.base64,
                };

                const { isError, errorMessage } = await PostService.newPost(requestBody, authData);
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

                navigation.navigate('Timeline');
            }}
        >
            {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            placeholder='Judul Post'
                            autoCorrect={false}
                            autoComplete="off"
                            multiline={true}
                            onChangeText={handleChange('title')}
                            value={values.title}
                        />
                        {errors.title ? (<Text style={styles.textInputErrorMessage}>{errors.title}</Text>) : <></>}
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            placeholder='Deskripsi Post'
                            autoCorrect={false}
                            autoComplete="off"
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={handleChange('description')}
                            value={values.description}
                        />
                        {errors.description ? (<Text style={styles.textInputErrorMessage}>{errors.description}</Text>) : <></>}
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Pilih gambar untuk dibagikan</Text>
                        <Button
                            type="outline"
                            color="primary"
                            style={{ marginBottom: 20 }}
                            size="sm"
                            title={!image ? 'Pilih dari galeri' : 'Ubah gambar'}
                            onPress={pickImage} />
                        {
                            image ?
                                <View style={{ paddingHorizontal: 10, paddingVertical: 40, alignItems: 'center' }}>
                                    <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />
                                </View>
                                : ''}
                    </View>
                    <Button
                        type="outline"
                        color="primary"
                        style={{ paddingVertical: 20 }}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        title={isSubmitting ? <ActivityIndicator /> : 'Bagikan'}
                    />
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
        paddingLeft: 10,
    }
});