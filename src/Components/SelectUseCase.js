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

const SelectUseCase = () => {
  const navigate = useNavigate();

  const handleLiveNowClick = () => {
    navigate('/LiveUpdate');
  };

  return (
    <div>
      <div className='head'>
        <img src={Logo} alt="Logo" />
        <div className='input-container'>
          <input placeholder="search" />
          <img src={AuthIcons} alt="Auth Icons" className="icon" />
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
