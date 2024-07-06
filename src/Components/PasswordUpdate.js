import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "./Button";

const PasswordUpdate = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();
  const { tempToken } = useParams();

  const baseUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setUpdateError("Passwords do not match.");
      return;
    }
    if (password1.length < 6) {
      setUpdateError("Passwords length must be atleast 6.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/confirm-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password1,
          confirmPassword: password2,
          token: tempToken,
        }),
      });

      const data = await response.json();
      console.log("dataly........", data);

      if (response.ok) {
        navigate(`/PasswordCongrat?email=${data.data.email}`);
      } else {
        setUpdateError(
          data.message || "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setUpdateError(
        "An error occurred while updating the password. Please try again later."
      );
    }
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center border  mx-[20rem] bg-white">
        <h2 className="font-bold text-3xl py-4">Update Password</h2>
        <div className="gap-y-4 w-[40%]">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                id="password1"
                name="password2"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="py-3"
                required
              />
            </div>

            <div className="flex flex-col py-3">
              <label htmlFor="password2"> Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="py-3"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-purple-900 px-2"
              text="Save Password"
            ></Button>
            <p className=" text-center py-4">
              This will be your new password to sign in to stridez
            </p>
          </form>
          {updateError && <p style={{ color: "red" }}>{updateError}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
