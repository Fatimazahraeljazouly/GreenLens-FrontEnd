import React, { createContext, useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { userData } from '../utils/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType{
    user:userData | null,
    loading:boolean,
    login:(userData:userData)=>Promise<void>,
    logout:()=>Promise<void>
};

export const AuthContext = createContext<AuthContextType | null>(null)
interface AuthProviderProps{
    children:React.ReactNode
}

export default function AuthProvider({children}:AuthProviderProps) {
    const toast=useToast();
    const [user,setUser]=useState<userData | null>(null);
    const [loading,setLoading]= useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (e) {
                toast.show('Error in user data loading', { type: 'danger' });
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [toast]);

    const login = async(userData:userData)=>{
        try {
            setUser(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
          } catch (error) {
            toast.show('Error during login', { type: 'danger' });
          }

    };

    const logout = async ()=>{
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
          } catch (error) {
            toast.show('Error during logout', { type: 'danger' });
          }
    };


  return (
    <AuthContext.Provider value={{user,login,logout,loading}}>
        {children}
    </AuthContext.Provider>
  )};
