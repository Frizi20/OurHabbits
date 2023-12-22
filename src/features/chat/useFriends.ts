import { useState, useEffect } from 'react';
import { getUserFriends } from '../../services/apiUsers';

function useFriends() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<[] | null>(null);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        setIsLoading(true);
        (async function () {
            try {
                const data = await getUserFriends();
                setData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        isLoading,
        data,
        error,
    };
}

export default useFriends;
