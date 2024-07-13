import React from 'react';

const ExploreAuth = ({ isSignIn, setIsSignIn }) => {
  return (
    <div className='explore-auth'>
      <button className="explore-button">Explore</button>
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
