import React, {useContext,useState,createContext ,ReactNode} from 'react';
import { Account } from '../utils/Types';
type UserContextType = {
    user:Account | null,
    setUser:React.Dispatch<React.SetStateAction<Account|null>>,
}

const UserContext = createContext<UserContextType| undefined>(undefined);

//context provider
export const UserProvider=({children}:{ children: ReactNode })=>{
const [user,setUser]=useState<Account | null>(null);
return (
<UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = ()=>{
    const context = useContext(UserContext);
    if (!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
