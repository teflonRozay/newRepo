import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          triggerEvent: "confirm-reset-password",
        }),
      });

      if (response.ok) {
        navigate("/ResetPassword"); // Navigate to the reset password page
      } else {
        const data = await response.json();
        console.log(data);
        setErrorMessage(data.message || "Invalid email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "An error occurred while requesting the password reset. Please try again later."
      );
    }
  };

  return (
    <div className=" bg-white">
      <div className="flex flex-col justify-center items-center h-screen gap-y-4 border mx-[20rem]">
        <div className="flex flex-col m">
          <h1 className="font-bold text-2xl">Forgot Password?</h1>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="email" className="my-2">
              Enter your email address to reset your password.
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full my-2"
            />

            <Button
              type="submit"
              className="bg-purple-900 px-2 mx-auto"
              text="Reset Password"
            ></Button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
