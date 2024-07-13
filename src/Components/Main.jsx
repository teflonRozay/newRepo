import React, { useEffect, useState } from "react";
import authService from "../Services/Auth.jsx";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = authService.isAuthenticated();
      if (!authenticated) {
        navigate("/");
      } else {
        try {
          const user = await authService.getAuthUser();
          if (!user.profileSetupCompleted) {
            console.log("User profile", user)
            navigate(`/SelectUseCase?email=${user.email}`);
          } else {
            navigate(`/Main`);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/");
        }
      }
    };

    fetchData();
  }, [navigate]); // Dependencies for the useEffect hook

  return (
    <div className="">
      Email Verified
      <p className="font-bold text-4rem underline">{user && user.email}</p>
    </div>
  );
};

export default Main;
