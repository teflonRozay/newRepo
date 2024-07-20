<<<<<<< HEAD:src/Components/SelectUseCase.jsx
import React, { useEffect, useState } from "react";
import isAuthenticated from "../Services/Auth.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button.jsx";
const SelectUseCase = `${process.env.PUBLIC_URL}/SelectUseCase.jpg`;
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/SelectUseCase.css';
import Logo from '../assets/logo.png';
import Live from '../assets/Live.png';
import AuthIcons from '../assets/AuthIcons.png';
import Analytics from '../assets/Analytics.png';
import Calendar from '../assets/Calendar.png';
import CourseManage from '../assets/CourseManage.png';
import ExploreFor from '../assets/ExploreFor.png';
import HorizontalDivider from '../assets/HorizontalDivider.png';
import Notification from '../assets/Notification.png';
import Profile from '../assets/Profile.png';
import UploadVideo from '../assets/UploadVideo.png';
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/SelectUseCase.js

const SelectUseCase = () => {
  const navigate = useNavigate();

<<<<<<< HEAD:src/Components/SelectUseCase.jsx
  const roles = [
    { title: "creator", desc: "I'm a creator" },
    { title: "learner", desc: "I'm a learner" },
  ];

  const handleClick = (role) => {
    setRole(role);
  };

  const handleExplore = (e) => {
    e.preventDefault();
    console.log("something here....", role);
    if (!role) {
      setError("Please select if you want to be a guide or learner");
    } else {
      role === "learner"
        ? navigate(`/LearnerProfile?role=${role}`)
        : navigate(`/GuideProfile?role=${role}`);
    }
=======
  const handleLiveNowClick = () => {
    navigate('/LiveUpdate');
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/SelectUseCase.js
  };

  return (
    <div>
<<<<<<< HEAD:src/Components/SelectUseCase.jsx
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

        <div className="flex-1 flex flex-col my-20 px-10  justify-center items-center text-center gap-y-4">
          <div className="gap-y-4">
            <p className="font-bold text-3xl py-2">Hey, {email} </p>
            <form onSubmit={handleExplore} className="w-[30rem]">
              <label className="py-4 text-xl">
                Select whether you are a creator or a learner to get started
              </label>
              {/* You can uncomment and modify the buttons if needed */}
              {roles.map((item, index) => (
                <div key={index} onClick={() => handleClick(item.title)}>
                  <p
                    className={`py-2 hover:cursor-pointer rounded-lg mt-2 px-2 border-3 text-xl text-black ${
                      role === item.title
                        ? "bg-purple-300 border-purple-600"
                        : "bg-slate-300 hover:bg-purple-300 hover:border-purple-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}

              <div onClick={(e) => handleExplore(e)}>
                <Button
                  type="submit"
                  className="bg-purple-900 px-2 mt-4"
                  text="Continue"
                ></Button>
              </div>
              {/* Additional label (might be duplicate) */}
              <p className="py-4 text-xl">
                Selecting one will enable stridez to personalize your experience
                as either a creator or leaner
              </p>
            </form>
            {/* Display error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
=======
      <div className='head'>
        <img src={Logo} alt="Logo" />
        <div className='input-container'>
          <input placeholder="search" />
          <img src={AuthIcons} alt="Auth Icons" className="icon" />
>>>>>>> eabe8b6d5cb609d6eadcf2c3e1aa6a6585635de0:src/Components/SelectUseCase.js
        </div>
        <img src={Notification} alt="Notification" />
      </div>
      
      <div className="part">
        <img src={Live} alt="Live" onClick={handleLiveNowClick} />
        <img src={UploadVideo} alt="UploadVideo" />
        <img src={Calendar} alt="Calendar" />
        <img src={CourseManage} alt="Course Manage" />
        <img src={Analytics} alt="Analytics" />
        <img src={ExploreFor} alt="Explore For" />
        <img src={Profile} alt="Profile" />
        <img src={HorizontalDivider} alt="Horizontal Divider" />
      </div>
    </div>
  );
};

export default SelectUseCase;
