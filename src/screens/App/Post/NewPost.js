import { Text } from 'react-native';
import usePostStore from '../../../store/PostStore';
import NewPostTypeSelectionScreen from './NewPostTypeSelection';

export default function NewPostScreen({ navigation }) {
    const isUserHasSelectedPostType = usePostStore(state => state.isUserHasSelectedPostType);
    const selectedPostType = usePostStore(state => state.selectedPostType);

    return (
        <>
            {!isUserHasSelectedPostType ? <NewPostTypeSelectionScreen /> : <Text>OKE</Text>}
        </>
    );
}