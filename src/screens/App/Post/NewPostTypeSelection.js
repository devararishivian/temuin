import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import usePostStore from "../../../store/PostStore";

const POST_TYPE = {
  KEHILANGAN: true,
  MENEMUKAN: false,
};

export default function NewPostTypeSelectionScreen({ navigation }) {
  const setIsUserHasSelectedPostType = usePostStore(
    (state) => state.setIsUserHasSelectedPostType
  );
  const setSelectedPostType = usePostStore(
    (state) => state.setSelectedPostType
  );

  return (
    <View
      style={{
        flexDirection: "column",
        // padding: 20,
        backgroundColor: "#AE3012",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#FED386",
          width: "100%",
          height: 220,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontSize: 30,
            fontWeight: "bold",
            color: "#AE3012",
            letterSpacing: 0.5,
          }}
        >
          Jenis postingan apa
        </Text>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 5,
            fontSize: 20,
            fontWeight: "bold",
            color: "#AE3012",
            letterSpacing: 0.5,
          }}
        >
          yang ingin kamu buat ?
        </Text>
        <Picker
          selectedValue="pilih"
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != "pilih") {
              setSelectedPostType(itemValue);
              setIsUserHasSelectedPostType(true);
            }
          }}
          style={{
            marginTop: 40,
            marginHorizontal: 20,
            backgroundColor: "#FFE3B2",
            borderRadius: 20,
            paddingBottom: 75
            // height: 300,
          }}
          itemStyle={{ fontSize: 15, color: "#AE3012", fontWeight: "bold" }}
        >
          <Picker.Item label="Pilih" value="pilih" />
          <Picker.Item
            label="Kehilangan sesuatu"
            value={POST_TYPE.KEHILANGAN}
          />
          <Picker.Item label="Menemukan sesuatu" value={POST_TYPE.false} />
        </Picker>
      </View>
    </View>
  );
}
