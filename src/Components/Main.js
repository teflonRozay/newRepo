import React, { useEffect, useState } from "react";
import isAuthenticated from "../Services/Auth";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const baseUrl =process.env.REACT_APP_BASEURL

  const getAuthUser = async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      console.log("Error has Occurred");
    }

    const data = await response.json();
    setUser(data.data);
    console.log(data.data)
  };

  useEffect(() => {
    getAuthUser();

    const authenticated = isAuthenticated.isAuthenticated();
    console.log("Authenticated", authenticated);
    if (!authenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="">
      Email Verified
      <p className="font-bold text-4rem underline">{user && user.email}</p>
    </div>
  );
};

export default Main;
