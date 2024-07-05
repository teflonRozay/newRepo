import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Logo from "../public/logo.png";

import "../styles/AuthForm.css";
import HeaderImage from "./HeaderImage.js";
import ExploreAuth from "./ExploreAuth.js";

import SocialButtons from "./SocialButtons.js";
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";
const Logo = `${process.env.PUBLIC_URL}/logo.png`;

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRememberPassword = () => {
    setRememberPassword(!rememberPassword);
  };

  return (
    <div className="auth-container">
      <HeaderImage src={Logo} />
      <ExploreAuth isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      <SocialButtons isSignIn={isSignIn} />
      <div className="form-container">
        {isSignIn ? (
          <SignInForm
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            rememberPassword={rememberPassword}
            toggleRememberPassword={toggleRememberPassword}
            navigate={navigate}
          />
        ) : (
          <SignUpForm
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            rememberPassword={rememberPassword}
            toggleRememberPassword={toggleRememberPassword}
            navigate={navigate}
          />
        )}
      </div>
      <div className="all">
        By creating an account, you agree to our Terms of Service and Privacy &
        Cookie Statement.
      </div>
    </div>
  );
};

export default AuthForm;
