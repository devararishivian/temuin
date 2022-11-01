import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as UserService from '../../services/UserService';
import * as PostService from '../../services/PostService';
import useAuthStore from "../../store/AuthStore";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// const itemPost = [
//   {
//     id: 1,
//     name: "test 1",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 2,
//     name: "test 2",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 3,
//     name: "test 3",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 4,
//     name: "test 4",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 5,
//     name: "test 5",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 6,
//     name: "test 6",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 7,
//     name: "test 7",
//     image: require("../../../assets/listPosting-1.png"),
//   },
//   {
//     id: 8,
//     name: "test 8",
//     image: require("../../../assets/listPosting-1.png"),
//   },
// ];

export default function ProfileScreen({ navigation }) {
  const authData = useAuthStore(state => state.authData);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [posts, setPost] = useState();

  useEffect(() => {
    async function getUserData() {
      const { data, isError, errorMessage } = await UserService.getUserData(authData.user.id);
      if (data) {
        setName(data[0].name);
        setUsername(data[0].username);

        let formattedRegisteredAt = format(new Date(data[0].created_at), "d MMMM yyyy", {
          locale: id
        });

        setRegisteredAt(formattedRegisteredAt);
      }
    }

    getUserData();

    async function getUserPosts() {
      const { data, isError, errorMessage } = await PostService.getUserPost(authData.user.id);
      if (data) {
        setPost(data);
      }
    }

    getUserPosts();
  }, []);

  // const oneItem = ({ item }) => (
  //   <Image
  //     style={{
  //       width: 162,
  //       height: 162,
  //       marginLeft: 30,
  //       marginTop: 20,
  //       borderRadius: 8,
  //     }}
  //     source={item.image}
  //   />
  // );

  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/avatar-profile.png")}
        />
        <View style={{ flexDirection: "column", marginVertical: 50, marginHorizontal: 20 }}>
          <Text style={styles.profileName}>{name}</Text>
          <Text>@{username}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.description_post}>Post</Text>
          <Text style={styles.description_since}>Terdaftar Sejak</Text>
        </View>
        <View>
          <Text style={styles.postCount}>6</Text>
          <Text style={styles.since}>{registeredAt}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginLeft: 30, marginRight: 30 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hairline} />
      <View style={{ alignItems: "center" }}></View>
      <FlatList
        numColumns={2}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => (
          <Image
            style={{
              width: 150,
              height: 150,
              marginLeft: 30,
              marginTop: 20,
              borderRadius: 8,
            }}
            source={{ uri: item.image }}
          />
        )}
        ListEmptyComponent={<Text>No Post</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: 30,
    padding: 10,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#8A4065",
  },
  description_post: {
    // marginTop: 75,
    fontWeight: "450",
    marginLeft: 25,
    color: "#8A4065",
  },
  description_since: {
    marginTop: 10,
    fontWeight: "450",
    marginLeft: 25,
    color: "#8A4065",
  },
  postCount: {
    // marginTop: 75,
    marginLeft: 30,
    color: "#8A4065",
  },
  since: {
    marginTop: 10,
    marginLeft: 30,
    color: "#8A4065",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "100%",
    height: 40,
    elevation: 3,
    backgroundColor: "#E1CBCF",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#8A4065",
  },
  hairline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#8A4065",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    height: 2,
    backgroundColor: "#8A4065",
    borderRadius: 5,
  },
});