import React from 'react';
import '../App.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
//import './GetStarted.css';



function GetStarted() {

//   const videoplayer = () => {
//     <Video />
//   }
  return (
    <div className='hero-container'>
      <h1>My Calendar App</h1>
      <p>Organizing your life one day at a time</p>
      <div className='hero-btns'>
      <Link to='/SignUpForm'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Sign Up
        </Button>
        </Link>
        <Link to='/LoginForm'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
            Login
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;