import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

      if (response.ok) {
        navigate("/PasswordCongrat"); // Navigate to the password updated page
      } else {
        const data = await response.json();
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
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password"> Password1:</label>
          <input
            type="password"
            id="password1"
            name="password2"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password2"> Password2:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {updateError && <p style={{ color: "red" }}>{updateError}</p>}
    </div>
  );
};

export default PasswordUpdate;
