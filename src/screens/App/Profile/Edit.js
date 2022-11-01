import { Pressable, Text } from "react-native";

export default function EditProfileScreen({ navigation }) {
    return (
        <>
            <Text>Edit Profile Screen</Text>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Cancel</Text>
            </Pressable>
        </>
    );
}