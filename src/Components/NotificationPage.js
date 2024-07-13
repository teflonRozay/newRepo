
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:4000');

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = 'user123'; // Replace with the actual user ID
    socket.emit('register', userId);

    socket.on('new-webinar', (data) => {
      setNotifications(prev => [...prev, { ...data, type: 'new' }]);
    });

    socket.on('webinar-reminder', (data) => {
      setNotifications(prev => [...prev, { ...data, type: 'reminder' }]);
    });

    return () => {
      socket.off('new-webinar');
      socket.off('webinar-reminder');
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification, index) => (
        <div key={index} style={{ border: '1px solid', padding: '10px', margin: '10px', backgroundColor: notification.type === 'reminder' ? 'yellow' : 'white' }}>
          <p>{notification.type === 'reminder' ? 'Reminder' : 'New Webinar'}: {notification.title}</p>
          <p>{notification.description}</p>
          {notification.type === 'reminder' && <Link to="/live-page">Join Live Event</Link>}
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
