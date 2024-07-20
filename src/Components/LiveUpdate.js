import React from "react";
import '../styles/LiveUpdate.css';
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
import Instant from '../assets/Instant.png';
import Input from '../assets/Input.png';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const socket = io('http://localhost:4000');




const LiveUpdate = () => {
  
  const navigate = useNavigate();
  const handleLive = () => {
    navigate('/ScheduleForm');
    console.log('Schedule');
  };
  
  const startLive = () => {
    navigate('/StartLive');
    console.log('Schedule');
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
    <div className="state">
    <div className="part">
      <img src={Live} alt="Live"  />
      <img src={UploadVideo} alt="UploadVideo" />
      <img src={Calendar} alt="Calendar" />
      <img src={CourseManage} alt="Course Manage" />
      <img src={Analytics} alt="Analytics" />
      <img src={ExploreFor} alt="Explore For" />
      <img src={Profile} alt="Profile" />
      <img src={HorizontalDivider} alt="Horizontal Divider" />
    </div>
    <div className="schedule">
          <h1>Please select the purpose of the live Session</h1>
          <h3>Are you starting an instant meeting or scheduling one?</h3>
          <button onClick={startLive}><img src={Instant} alt="Instant" /></button>
          <button  onClick={handleLive}><img src={Input} alt="Input" /></button>
        </div>
    </div>
   
    
  </div>
  );
};

export default LiveUpdate;
