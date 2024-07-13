import React, { useEffect } from "react";
import isAuthenticated from "../Services/Auth";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen.js";
import Button from "./Button.js";
import { useLocation } from "react-router-dom";

const Congrats = `${process.env.PUBLIC_URL}/Congrats.png`;

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleExplore = () => {
    console.log("working here...........");
    navigate("/Main");
    navigate(`/SelectUseCase?email=${email}`);
  };

  useEffect(() => {
    const authenticated = isAuthenticated.isAuthenticated();
    if (!authenticated) {
      navigate(`/`);
    }
  }, [navigate]);

  return (
    <div>
      <div className="flex">
        <div className="flex w-[40%]">
          <SplashScreen />
        </div>
        <div className="flex-1 flex flex-col my-20 px-10 justify-center items-center gap-y-4">
          <div className="h-20 w-20">
            <img src={Congrats} alt="congrats" />
          </div>
          <div className="gap-y-4">
            <p className="font-bold text-2xl py-4">Hey, {email} </p>
            <p className="py-4">
              Congratulations! Your email has been successfully verified
            </p>
            <div onClick={handleExplore}>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Explore App"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
