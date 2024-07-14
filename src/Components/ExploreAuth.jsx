import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreAuth = ({ isSignIn, setIsSignIn }) => {
  const navigate = useNavigate()
  return (
    <div className='explore-auth'>
      <button onClick={()=>navigate("/")} className="explore-button">Explore</button>
      <div className="button-container">
        <button
          className={`auth-button ${isSignIn ? 'active' : ''}`}
          onClick={() => setIsSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={`auth-button ${!isSignIn ? 'active' : ''}`}
          onClick={() => setIsSignIn(false)}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default ExploreAuth;
