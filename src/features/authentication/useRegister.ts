import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type UserCredentials = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

function useRegister() {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function registerUser(userData: UserCredentials) {
        setIsLoading(true);
        setError('');

        try {
            const res = await axios.post(
                '/auth/register',
                JSON.stringify(userData)
            );

            console.log(res.data);

            const { data, status } = res;

            if (status !== 200) {
                throw new Error('Could not register user');
            }

            setUser(data);
            navigate('/');
        } catch (error) {
            const err = error as AxiosError;
            const errData = err.response?.data;
            const errStatusMsg = err.message;

            if (errData && typeof errData === 'string') {
                setError(errData);
            } else {
                setError(errStatusMsg);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { error, isLoading, registerUser };
}

export default useRegister;
