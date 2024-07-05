import React, { useEffect } from "react";
import isAuthenticated from "../Services/Auth";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = isAuthenticated.isAuthenticated();
    if (!authenticated) {
      navigate("/");
    }
  });

  return <div>Email Verified</div>;
};

export default Welcome;
