import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./SplashScreen.js";
import AuthForm from "./AuthForm.js";
import ForgotPassword from "./ForgotPassword.js";
import Success from "./Success.js";
import Main from "./Main.js";
import EmailVerify from "./EmailVerify.js";
import SelectUseCase from "./SelectUseCase.js";

import Welcome from "./Welcome.js";
import ResetPassword from "./ResetPassword.js";
import HandleGoogleRedirect from "./HandleGoogleRedirect.js";
import PasswordUpdate from "./PasswordUpdate.js";
import PasswordCongrat from "./PasswordCongrat.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../styles/Details.css";

const Home = () => {
  return (
    <div className="details-container">
      <SplashScreen />
      <AuthForm />
    </div>
  );
};


const Details = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/callback/google"
          element={<HandleGoogleRedirect />}
        />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/EmailVerify" element={<EmailVerify />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/PasswordUpdate/:tempToken" element={<PasswordUpdate />} />
        <Route path="/PasswordCongrat" element={<PasswordCongrat />} />
        <Route path="/SelectUseCase" element={<SelectUseCase />} />
      </Routes>
    </Router>
  );
};

export default Details;
