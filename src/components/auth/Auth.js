import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Auth = () => {
    const location = useLocation();
    const isAuth = useSelector(state => state.login.isAuth)

    return (
        isAuth && localStorage.getItem('token')
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
};

export default Auth;
