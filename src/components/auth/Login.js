import { useState, useRef, useEffect } from 'react';
import classes from './Login.module.css';
import axios from '../../api/axios';
import { LOGIN_URL } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/loginSlice';
import { useNavigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../../ui/LoadingSpinner'

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const refreshToken = useSelector((state) => state.login.refreshToken);

  const [persist, setPersist] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');


  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMsg('');
  }, [email, password])


  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      setSubmit(true);
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      const token = response?.data?.token;
      const refreshToken = response?.data?.refreshToken;

      dispatch(login({ token, refreshToken }));
      setEmail('');
      setPassword('');
      setSubmit(false);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setSubmit(false);
        setErrorMsg('No Server Response');
      }
      else if (error.response?.status === 400) {
        setSubmit(false);
        setErrorMsg('Incorrect Email or Password');
      }
      else if (error.response?.status === 401) {
        setSubmit(false);
        setErrorMsg('Unauthorized');
      }
      else {
        setSubmit(false);
        setErrorMsg('Login failed');
      }
      errorRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  }, [token, refreshToken]);

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <p ref={errorRef} className={errorMsg ? `${classes.errormsg}` : `${classes.offscreen}`} aria-live="assertive">{errorMsg}</p>
      {submit && <LoadingSpinner/>}
      <form onSubmit={handleSubmit}>        
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='text' className='form-control' placeholder='Email'
            id='email' ref={userRef} autoComplete='off'
            required value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' placeholder='Password'
            id='password' required value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='persist' className="form-check-label">Remember me in</label>
          <input type='checkbox' className="form-check-input custom-control-input"
            id='persist' onChange={togglePersist} checked={persist}></input>
        </div>
        <div className={classes.actions}>
          <button disabled={submit}>Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
