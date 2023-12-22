import React, { useState } from 'react';

function useUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState()

    return { isLoading, error };
}

export default useUser;
