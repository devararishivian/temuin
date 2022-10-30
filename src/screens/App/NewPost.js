import { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from "react-native";
import { Image, Button, Input } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as PostService from '../../services/PostService';
import { Picker } from '@react-native-picker/picker';

const schema = Yup.object().shape({
    title: Yup.string().max(100).required(),
    description: Yup.string().required(),
});


export default function NewPostScreen() {
    const [image, setImage] = useState(null);
    const [isUserHasSelectedPostType, setIsUserHasSelectedPostType] = useState(false);
    const [isLookingFor, setIsLookingFor] = useState(true);
    const [selectedPostType, setSelectedPostType] = useState();

    const POST_TYPE = {
        KEHILANGAN: true,
        MENEMUKAN: false,
    };

    const pickImage = async () => {
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

    const handlePost = async (values, setSubmitting) => {
        setSubmitting(true);
        const requestBody = {
            title: values.title,
            description: values.description,
            is_looking_for: isLookingFor
        }
        const { isError, errorMessage } = await PostService.insertPostData(requestBody);
        console.log(errorMessage);
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

    function PostTypeSelection() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    padding: 20,
                }}
            >
                <Text>Jenis postingan apa yang ingin Kamu buat?</Text>
                <Picker
                    selectedValue="pilih"
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue != 'pilih') {
                            setSelectedPostType(itemValue);
                            setIsUserHasSelectedPostType(true);
                        }
                    }}
                >
                    <Picker.Item label="Pilih" value='pilih' />
                    <Picker.Item label="Kehilangan sesuatu" value={POST_TYPE.KEHILANGAN} />
                    <Picker.Item label="Menemukan sesuatu" value={POST_TYPE.false} />
                </Picker>
            </View>
        );
    }

    return (
        <>
            {!isUserHasSelectedPostType ? <PostTypeSelection></PostTypeSelection> :
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
                            <Button color="error" title="Unggah Gambar" onPress={pickImage} />
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            {/* <View style={styles.button}>
                        <Button size="sm" title="Upload Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage} />
                    </View>
                    <View style={styles.button}>
                        <Button size="sm" title="Remove Image" type="clear" titleStyle={styles.buttonTitle} onPress={pickImage} />
                    </View> */}
                        </ScrollView>
                    )}
                </Formik>
            }
        </>
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
    checkbox: {
        backgroundColor: "#8A4065"
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