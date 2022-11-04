import usePostStore from '../../../store/PostStore';
import NewPostTypeSelectionScreen from './NewPostTypeSelection';
import NewPostFormScreen from './NewPostForm';

export default function NewPostScreen({ navigation }) {
    const isUserHasSelectedPostType = usePostStore(state => state.isUserHasSelectedPostType);

    return (
        <>
            {!isUserHasSelectedPostType ? <NewPostTypeSelectionScreen /> : <NewPostFormScreen />}
        </>
    );
}