import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

type TUser = {
    name: string;
    id: string;
    image: string;
    email: string;
    isVerified: boolean;
    role: 'user' | 'admin';
};

type TAuthContext = {
    user: TUser | null;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
    isLoading: boolean;
};

const AuthContext = createContext<TAuthContext | null>(null);

function AuthProvider({ children }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<TUser | null>(null);

    // {
    //     name: '',
    //     id: '',
    //     image: '',
    //     isVerified: false,
    //     email: '',
    //     role: 'user',
    // }

    useEffect(() => {
        setIsLoading(true);
        async function getCurrUser() {
            try {
                const res = await axios.get('/auth/showMe');
                const { data } = res;

                setUser(data.user);
            } catch (error) {
                // console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        getCurrUser();
    }, []);

    const value = { user, setUser, isLoading };


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Don't use useContext outside the Provider");
    return context;
}

export default AuthProvider;
