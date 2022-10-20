import create from 'zustand'

const useAuthStore = create((set, get) => ({
    authData: null,
    storeAuthData: (data) => set((state) => ({
        authData: state.authData = {
            userID: data.userID,
            username: data.username,
            email: data.email
        },
    })),
}));

export default useAuthStore;