import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.js";


const ResetPassword = () => {
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASEURL;

  
  const handleChange = (e, index) => {
    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = e.target.value;
    setCodeDigits(newCodeDigits);
  };

  const buttonStyle = {
    margin: "2rem",
    // Add more styles as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = codeDigits.join("");

    try {
      const response = await fetch(`${baseUrl}/auth/validate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          triggerEvent: "confirm-reset-password",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("validation token: " + data);
        navigate(`/PasswordUpdate/${data.data.token}`);
      } else {
        setVerificationError("Incorrect verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationError("An error occurred while verifying the code.");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center border mx-[20rem] h-screen bg-white">
        <div>
          {/* <h2>Verify Email</h2> */}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-2xl">Enter Verification Code</label>
            <div>
              {codeDigits.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  min="0"
                  max="9"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className=" w-[3em] h-[3em] text-center input-no-spinner  border rounded-lg border-black mx-2 my-4"
                />
              ))}
            </div>
            {/* <button type="submit" style={buttonStyle}>
              Submit
            </button> */}
            <Button
              type="submit"
              className="bg-purple-900 px-2"
              text="Submit"
            ></Button>
          </form>
          {verificationError && (
            <p style={{ color: "red" }}>{verificationError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
