import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/ScheduleLive.css';
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

const socket = io('http://localhost:4000');

const ScheduleForm = () => {
   const navigate = useNavigate();
   

   const [formData, setFormData] = useState({
     webinarTitle: '',
     description: '',
     selectedDate: new Date(),
     startTime: '',
     endTime: '',
     selectedTimezone: '',
     guestEmail: '',
     coGuestEmail: '',
   });
 
   useEffect(() => {
     const userId = 'user123'; // Replace with the actual user ID
     socket.emit('register', userId);
 
     return () => {
       socket.off('new-webinar');
       socket.off('webinar-reminder');
     };
   }, []);
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };
 
   const handleDateChange = (date) => {
     setFormData((prevData) => ({
       ...prevData,
       selectedDate: date,
     }));
   };
 
   const handleTimeChange = (name, value) => {
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     const response = await fetch('http://localhost:4000/save-form', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });
 
     if (response.ok) {
      navigate('/WebinarDetails', { state: { formData } });
     }
 
  

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

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="webinarTitle">Add webinar title:</label>
        <input
          type="text"
          id="webinarTitle"
          name="webinarTitle"
          placeholder="Add webinar title"
          value={formData.webinarTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Add description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="selectedDate">Pick date:</label>
        <DatePicker
          selected={formData.selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          required
        />
      </div>
      <div>
        <label htmlFor="startTime">Start time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={(e) => handleTimeChange('startTime', e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="endTime">End time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={(e) => handleTimeChange('endTime', e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="selectedTimezone">Select timezone:</label>
        <select
          id="selectedTimezone"
          name="selectedTimezone"
          value={formData.selectedTimezone}
          onChange={handleChange}
          required
        >
          <option value="">Select timezone</option>
          <option value="GMT">GMT</option>
          <option value="PST">PST</option>
          <option value="EST">EST</option>
          {/* Add more timezones as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="guestEmail">Add guest:</label>
        <input
          type="email"
          id="guestEmail"
          name="guestEmail"
          placeholder="Add guest email"
          value={formData.guestEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="coGuestEmail">Add co-guest:</label>
        <input
          type="email"
          id="coGuestEmail"
          name="coGuestEmail"
          placeholder="Add co-guest email"
          value={formData.coGuestEmail}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>



   
    </div>
   
    
  </div>
  );
};
 }
export default ScheduleForm;
