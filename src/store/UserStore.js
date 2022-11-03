import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set, get) => ({
            userData: null,
            storeUserData: (data) => set(
                (state) => ({
                    userData: state.userData = data,
                })
            ),
            removeUserData: () => set({ userData: null }),
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                });
            }
        }),
        {
            name: 'user-storage', // name of item in the storage (must be unique)
            getStorage: () => AsyncStorage,
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            }
        }
    )
);

export default useUserStore;