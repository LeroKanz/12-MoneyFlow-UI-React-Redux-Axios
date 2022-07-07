import React from 'react';
import classes from '../components/auth/Login.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();    
    navigate('/login');
  };
  

  return (
    <section className={classes.auth}>
      <h1>We have everything here deploy!</h1>
      <div className={classes.actions}>
        <button onClick={handleSubmit}>Get everything</button>
      </div>
    </section>
  )
}

export default Home
