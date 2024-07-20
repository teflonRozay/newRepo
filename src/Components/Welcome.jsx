import React, { useEffect } from "react";
import isAuthenticated from "../Services/Auth.jsx";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen.jsx";
import Button from "./Button.jsx";
import { useLocation } from "react-router-dom";
<<<<<<< HEAD:src/Components/Welcome.jsx
=======

>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/Welcome.js
const Congrats = `${process.env.PUBLIC_URL}/Congrats.png`;

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

<<<<<<< HEAD:src/Components/Welcome.jsx
  const handleExplore = async (e) => {
    e.preventDefault();

    const newlyuser = localStorage.getItem("currentuser");
    const user = JSON.parse(newlyuser);
    console.log("objected.........", user);

    if (!user.profileSetupCompleted) {
      console.log("true:", true);
      window.location.href = `/SelectUseCase?email=${email}`;
    } else {
      navigate(`/Main`);
    }
=======
  const handleExplore = () => {
    console.log("working here...........");
    navigate("/Main");
    navigate(`/SelectUseCase?email=${email}`);
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/Welcome.js
  };

  useEffect(() => {
    const newlyuser = localStorage.getItem("currentuser");
    const user = JSON.parse(newlyuser);
    
    if (!user.profileSetupCompleted) {
      console.log("true:", true);
      window.location.href = `/SelectUseCase?email=${email}`;
    } else {
      navigate(`/Main`);
    }

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
<<<<<<< HEAD:src/Components/Welcome.jsx

          <div className="flex flex-col justify-center items-center gap-2 text-pretty">
=======
          <div className="gap-y-4">
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/Welcome.js
            <p className="font-bold text-2xl py-4">Hey, {email} </p>
            <p className="w-1/2">
              Congratulations! Your account has been successfully verified.
              Let's Personalize the app for your usecase to enhance your
              experience
            </p>
<<<<<<< HEAD:src/Components/Welcome.jsx
            <p></p>

            <div onClick={(e) => handleExplore(e)}>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Set up your profile"
              ></Button>
=======
            <div onClick={handleExplore}>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Explore App"
              />
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/Welcome.js
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
