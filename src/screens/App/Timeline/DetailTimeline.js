import { View } from "react-native";
import { Pressable, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Icon, Divider } from "@rneui/themed";

export default function DetailTimelineScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        comment: "",
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
      <ScrollView style={{ backgroundColor: "#F8F9FD", height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Image
            style={styles.avatar}
            source={require("../../../../assets/avatar-profile.png")}
          />
          <Text style={{ paddingLeft: 6 }}>{item.user.name}</Text>
          {item.is_looking_for ? (
            <Icon
              style={{ marginLeft: "auto" }}
              type="antdesign"
              name="questioncircle"
              color="black"
            />
          ) : (
            <Icon
              style={{ marginLeft: "auto" }}
              type="ionicon"
              name="information-circle"
              color="black"
            />
          )}
        </View>
        <Text style={styles.cardText}>{item.title}</Text>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
        <Text style={styles.cardText}>{item.description}</Text>
        <Divider width={4} />

        <Pressable onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </Pressable>
      </ScrollView>
    </Formik>
  );
}
const styles = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  cardImage: {
    marginTop: 10,
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
});
