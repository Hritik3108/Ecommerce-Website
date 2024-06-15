// ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children}) => {
    const user = useSelector((store) => store.user.user);
    const activeSession = useSelector((store) => store.user.sessionActive);

    if (!activeSession) {
        return <Navigate to="/login" />;
    }

    if (user.role=="USER") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
