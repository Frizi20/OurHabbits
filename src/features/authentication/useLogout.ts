import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios, { AxiosError } from 'axios';

function useLogout() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const { setUser } = useAuth();

    async function logout() {
        setIsLoading(true);
        setError('');

        try {
            const res = await axios.delete('/auth/logout');
            const { status } = res;

            if (status === 200) {
                setUser(null);
            }
        } catch (error) {
            const err = error as AxiosError;
            const errResData = err.response?.data;
            const errMsg = err.message;

            if (errResData && typeof errResData === 'string') {
                setError(errResData);
            } else {
                setError(errMsg);
            }
        }
    }

    return { isLoading, error, logout };
}

export default useLogout;
