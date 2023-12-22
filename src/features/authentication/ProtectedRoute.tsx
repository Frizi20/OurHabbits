import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    const isAuthenticated = !!user?.id;

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/login');
        },
        [isAuthenticated, navigate, isLoading]
    );

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
