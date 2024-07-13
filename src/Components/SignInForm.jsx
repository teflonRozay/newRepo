import React, { useEffect, useState } from "react";
import isAuthenticated from "../Services/Auth";
import Toastify from "./Toastify";

const SignInForm = ({
  passwordVisible,
  togglePasswordVisibility,
  rememberPassword,
  toggleRememberPassword,
  navigate,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const baseUrl = process.env.REACT_APP_BASEURL;

  // useEffect(() => {
  //   const authenticated = isAuthenticated.isAuthenticated();
  //   if (authenticated) {
  //     window.location.href = "/";
  //   }
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.NODE_ENV, baseUrl);
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.data.profileSetupCompleted) {
          console.log(
            "data.data.profileSetupComplete",
            data.data.profileSetupCompleted
          );
          localStorage.setItem("accessToken", data.data.token);
          setAlert("Login Successful");
          setTimeout(() => {
            window.location.href = "/";
          }, 900);
        } else {
          localStorage.setItem("accessToken", data.data.token);
          setAlert("Login Successful");
          if (data.data.role === "creator") {
            window.location.href = `/GuideProfile?role=${data.data.role}`;
          } else if (data.data.role === "learner" && data.data.bio) {
            window.location.href = `/TopicSelection`;
          } else if (
            data.data.role === "learner" &&
            (!data.data.bio === "" || !data.data.firstname)
          ) {
            window.location.href = `/LearnerProfile?role=${data.data.role}`;
          }
        }
      } else {
        setAlert(
          String(data.message) || "Invalid email or password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert("An error occurred while signing in. Please try again later.");
    }
  };

  return (
    <div>
      <Toastify message={alert} />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div className="input-container">
          <i className="fas fa-envelope input-icon"></i>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Johndoe@yahoo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-container">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="......."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`fas ${
              passwordVisible ? "fa-eye-slash" : "fa-eye"
            } toggle-icon`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="form-options">
          <div
            className="remember-password-container"
            onClick={toggleRememberPassword}
          >
            <div className={`checkbox ${rememberPassword ? "checked" : ""}`}>
              {rememberPassword && <i className="fas fa-check"></i>}
            </div>
            <span>Remember Password</span>
          </div>
          <a
            onClick={() => navigate("/ForgotPassword")}
            style={{ cursor: "pointer" }}
            className="forgot-password-link"
          >
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="submit-button">
          Sign In with Stridez
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
