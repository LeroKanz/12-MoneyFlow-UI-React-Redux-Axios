import classes from './Login.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logout());
        localStorage.removeItem("persist");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate('/home');
    };

    return (
        <section className={classes.auth}>
            <h1>Logout</h1>
            <div className={classes.actions}>
                <button onClick={handleSubmit}>Logout</button>
            </div>
        </section>
    );
};

export default Logout;
