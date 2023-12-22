import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type UserCredentials = {
    email: string;
    password: string;
};

function useLogin() {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function login(userData: UserCredentials) {
        setIsLoading(true);
        setError('');

        try {
            const res = await axios.post(
                '/auth/login',
                JSON.stringify(userData)
            );

            const { data, status } = res;

            if (status !== 200) {
                throw new Error('Could not log in');
            }

            setUser(data);
            navigate('/');
        } catch (error) {
            const err = error as AxiosError;
            const errData = err.response?.data;
            const errStatusMsg = err.message;

            if (errData && errData === 'string') {
                setError(errData);
            } else {
                setError(errStatusMsg);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { error, isLoading, login };
}

export default useLogin;
