import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import usePostStore from '../../../store/PostStore';

const POST_TYPE = {
    KEHILANGAN: true,
    MENEMUKAN: false,
};

export default function NewPostTypeSelectionScreen({ navigation }) {
    const setIsUserHasSelectedPostType = usePostStore(state => state.setIsUserHasSelectedPostType);
    const setSelectedPostType = usePostStore(state => state.setSelectedPostType);

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