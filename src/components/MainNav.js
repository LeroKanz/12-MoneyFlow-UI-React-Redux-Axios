import React from 'react'
import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { useSelector } from 'react-redux';


function MainNav() {
    const isAuth = useSelector(state => state.login.isAuth)

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    {isAuth && (<li>
                        <Link to="/categories">Categories</Link>
                    </li>)}
                    {isAuth && (<li>
                        <Link to="/accounts">Accounts</Link>
                    </li>)}
                    {isAuth && (<li>
                        <Link to="/logout">Logout</Link>
                    </li>)}
                    {!isAuth && (<li>
                        <Link to="/login">Log in</Link>
                    </li>)}
                    {!isAuth && (<li>
                        <Link to="/registration">Registration</Link>
                    </li>)}                    
                </ul>
            </nav>
        </header>
    )
}

export default MainNav
