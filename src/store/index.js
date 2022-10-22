import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            authData: null,
            storeAuthData: (data) => set(
                (state) => ({
                    authData: state.authData = data,
                })
            ),
            removeAuthData: () => set({ authData: null }),
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                });
            }
        }),
        {
            name: 'auth-storage', // name of item in the storage (must be unique)
            getStorage: () => AsyncStorage,
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            }
        }
    )
);

export default useAuthStore;