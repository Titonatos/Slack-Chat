import { Navigate, useLocation } from 'react-router-dom';
import getRoutes from '../routes.js';

const PrivatePage = () => {
    const location = useLocation();
    
    return (
        (localStorage.getItem("userID")) ? (<div>{"chat page"}</div>) : (
            <Navigate
                to={getRoutes.loginPagePath()}
                state={{ from: location }}
            />
        )
    );
};

export default PrivatePage;