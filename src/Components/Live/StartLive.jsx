import React, { useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import "../../styles/LiveVideo.css";

const StartLive = () => {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isVideoCall, setIsVideoCall] = useState(true); // New state for call type
  const [peer, setPeer] = useState(null);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:4000');
    socket.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    socket.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);
      if (data.type === 'offer') {
        const newPeer = new SimplePeer({ initiator: false, trickle: false });
        newPeer.signal(data.offer);
        setPeer(newPeer);
      } else if (data.type === 'answer') {
        peer.signal(data.answer);
      } else if (data.type === 'candidate') {
        peer.signal(data.candidate);
      }
    };
    socket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.current.close();
    };
  }, [peer]);

  const startStream = () => {
    console.log('Starting stream...');
    const constraints = isVideoCall 
      ? { video: true, audio: true }
      : { video: false, audio: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        console.log('Got user media stream');
        if (isVideoCall) {
          userVideo.current.srcObject = stream;
        }

        const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });
        newPeer.on('signal', (data) => {
          console.log('Peer signal:', data);
          if (data.type === 'offer') {
            socket.current.send(JSON.stringify({ type: 'offer', offer: data }));
          }
        });

        newPeer.on('stream', (stream) => {
          console.log('Received remote stream');
          if (isVideoCall) {
            partnerVideo.current.srcObject = stream;
          } else {
            const audio = new Audio();
            audio.srcObject = stream;
            audio.play();
          }
        });

        newPeer.on('error', (err) => {
          console.error('Peer error:', err);
        });

        setPeer(newPeer);
        setIsLive(true);
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });
  };

  const stopStream = () => {
    console.log('Stopping stream...');
    if (peer) {
      peer.destroy();
    }
    setIsLive(false);
  };

  const handleStartStop = () => {
    if (isLive) {
      stopStream();
    } else {
      startStream();
    }
  };

  const handleMuteUnmute = () => {
    if (userVideo.current && isVideoCall) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    if (userVideo.current && isVideoCall) {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = !isCameraOn;
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleCallType = () => {
    setIsVideoCall(!isVideoCall);
  };

  return (
    <div className="live-video-container">
      <div className="video-section">
        {isLive ? (
          <div className="video-feed">
            {isVideoCall ? (
              <>
                <video ref={userVideo} autoPlay playsInline muted={isMuted} className="video" />
                <video ref={partnerVideo} autoPlay playsInline className="video" />
              </>
            ) : (
              <div className="audio-call">Audio Call in Progress</div>
            )}
          </div>
        ) : (
          <div className="placeholder">Your video will appear here when live</div>
        )}
        <div className="controls">
          <button onClick={handleStartStop}>
            {isLive ? 'Stop Live' : 'Start Live'}
          </button>
          <button onClick={handleMuteUnmute}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={handleCameraToggle} disabled={!isVideoCall}>
            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          </button>
          <button onClick={toggleCallType} disabled={isLive}>
            {isVideoCall ? 'Switch to Audio Call' : 'Switch to Video Call'}
          </button>
        </div>
      </div>
      <div className="sidebar">
        <div className="chat-section">
          <h3>Live Chat</h3>
          {/* Chat messages would be rendered here */}
        </div>
        <div className="participant-list">
          <h3>Participants</h3>
          {/* List of participants would be rendered here */}
        </div>
        <div className="webinar-info">
          <h3>Webinar Information</h3>
          <p>Title: Sample Webinar</p>
          <p>Description: This is a sample webinar.</p>
          <p>Time: 12:00 PM - 1:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default StartLive;
