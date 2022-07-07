import React from 'react'
import {Link} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import classes from './Registration.module.css';
import {USER_REGEX, EMAIL_REGEX, PASS_REGEX, REGISTRATION_URL } from '../../constants';
import LoadingSpinner from '../../ui/LoadingSpinner'


function Registration() {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [submit, setSubmit] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PASS_REGEX.test(pass);
        setValidPass(result);
    }, [pass])

    useEffect(() => {
        setErrorMsg('');
    }, [user, email, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            await axios.post(REGISTRATION_URL,
                JSON.stringify({ fullName: user, email: email, password: pass }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setSuccess(true);
            setSubmit(false);
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

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Log in with your new credentials</Link>
                    </p>
                </section>
            ) : (
                <div className={classes.auth}>
                    <p ref={errorRef} className={errorMsg ? `${classes.errormsg}` : `${classes.offscreen}`} aria-live="assertive">{errorMsg}</p>
                    {submit && <LoadingSpinner/>}
                    <form onSubmit={handleSubmit}>
                        <h1>Registration</h1>
                        <div className={classes.control}>
                            <label htmlFor='userName'>Name</label>
                            <input type='text' placeholder='Your Name'
                                id='userName' ref={userRef} autoComplete='off'
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='useridnote'
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                onChange={(e) => setUser(e.target.value)} />
                            <p id="useridnote" className={userFocus && user && !validName ? `${classes.note}` : `${classes.offscreen}`}>
                                2 to 23 characters<br />
                                must begin with a letter
                            </p>

                            <label htmlFor='email'>Email</label>
                            <input type='text' placeholder='Your Email'
                                id='email' ref={userRef} autoComplete='off'
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='emailnote'
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                onChange={(e) => setEmail(e.target.value)} />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? `${classes.note}` : `${classes.offscreen}`}>
                                You should use your real email
                            </p>

                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Password'
                                value={pass}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='passnote'
                                onFocus={() => setPassFocus(true)}
                                onBlur={() => setPassFocus(false)}
                                onChange={e => setPass(e.target.value)} />
                            <p id="passnote" className={passFocus && !validPass ? `${classes.note}` : `${classes.offscreen}`}>
                                6 to 20 characters which contain: <br />
                                at least one numeric digit, <br />
                                one uppercase and one lowercase letter
                            </p>

                        </div>
                        <div className={classes.actions}>
                            <button disabled={submit}>Register Now!</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default Registration
