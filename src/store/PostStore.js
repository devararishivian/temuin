import create from 'zustand';

const usePostStore = create(
    (set, get) => ({
        newPostData: null,
        isUserHasSelectedPostType: false,
        setIsUserHasSelectedPostType: (data) => set(
            (state) => ({
                isUserHasSelectedPostType: state.isUserHasSelectedPostType = data,
            })
        ),
        selectedPostType: undefined,
        setSelectedPostType: (data) => set(
            (state) => ({
                selectedPostType: state.selectedPostType = data,
            })
        ),
        resetAllNewPostData: () => set((state) => ({
            newPostData: null,
            isUserHasSelectedPostType: false,
            selectedPostType: false,
        })),
    }),
);

export default usePostStore;