import React, { useEffect } from "react";
import isAuthenticated from "../Services/Auth";
import { useNavigate } from "react-router-dom";
import Button from "./Button.js";
import { useLocation } from "react-router-dom";
const SelectUseCase = `${process.env.PUBLIC_URL}/SelectUseCase.jpg`;

const Welcome = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleExplore = () => {
    console.log("working here...........");
    navigate("/Main");
  };

  useEffect(() => {
    const authenticated = isAuthenticated.isAuthenticated();
    if (!authenticated) {
      navigate("/SelectUseCase");
    }
  });

  return (
    <div>
      <div className="flex">
        <div className="flex w-[40%] relative">
          <div className="ml-6 relative rounded-lg border ">
            <img
              src={SelectUseCase}
              className="rounded-xl "
              alt="Select Use Case"
            />
            <div className="absolute bottom-0 left-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white p-4">
              <p className="text-5xl w-[60%] mb-[10rem]">
                Let's Begin The Journey
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col my-20 px-10  justify-center items-center gap-y-4">
          <div className="gap-y-4">
            <div>
              <p className="font-bold text-3xl py-4">Hey, {email} </p>
              <p className="py-4 ">
                Select weather you are a creator or a learner to get started
              </p>
            </div>
            <div onClick={() => handleExplore()}>
              <Button
                type="submit"
                className="bg-slate-300 hover:bg-purple-300 text-xl px-2 border-3 hover:border-purple-600 text-black"
                text="I'm a creator"
              ></Button>
            </div>{" "}
            <div onClick={() => handleExplore()}>
              <Button
                type="submit"
                className="mt-4 bg-slate-300 hover:bg-purple-300 text-xl px-2 border-3 hover:border-purple-600 text-black"
                text="I'm here to learn"
              ></Button>
            </div>
            <div onClick={() => handleExplore()}>
              <Button
                type="submit"
                className="bg-purple-900 px-2 mt-4"
                text="Continue"
              ></Button>
              

              <p className="py-4 ">
                Select weather you are a creator or a learner to get started
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
