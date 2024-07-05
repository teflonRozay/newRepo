import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen.js";
import Button from "./Button.js";
import { useLocation } from "react-router-dom";

const Success = () => {
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [verificationError, setVerificationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASEURL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleChange = (e, index) => {
    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = e.target.value;
    setCodeDigits(newCodeDigits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = codeDigits.join("");
    console.log(verificationCode);

    try {
      const response = await fetch(`${baseUrl}/auth/validate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          triggerEvent: "account-creation",
        }),
      });
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        navigate(`/Welcome?email=${email}`);
        localStorage.setItem('accessToken', data.data.token)
      } else {
        console.log(await response);
        setVerificationError("Incorrect verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationError("An error occurred while verifying the code.");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          triggerEvent: "account-creation",
        }),
      });

      if (response.ok) {
        setSuccessMessage("Otp sent successfully");
        setVerificationError("");
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
      <div className="flex">
        <div className="flex w-[40%]">
          <SplashScreen />
        </div>

        <div className="flex-1 flex flex-col my-20 px-10  justify-center items-center gap-y-4">
          <p className="font-bold text-2xl">Hey, {email} </p>

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <label>
                An Otp has been sent to your email, please enter the 6 digits
                below{" "}
              </label>

              <div className="my-10">
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="number"
                    min="0"
                    max="9"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className=" w-[3em] h-[3em] text-center input-no-spinner  border rounded-lg border-black mx-2"
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Confirm"
              ></Button>

              <p
                className="text-purple-900 underline py-4 hover:cursor-pointer"
                onClick={(e) => handleResendOtp(e)}
              >
                Resend a new code
              </p>
            </form>
          </div>
          {verificationError && (
            <p style={{ color: "red" }}>{verificationError}</p>
          )}

          {successMessage && (
            <p className="text-purple-900">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
