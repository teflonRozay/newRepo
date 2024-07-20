import { useEffect, useState, useCallback } from "react";
import "../../styles/LiveUpdate.css";
import Navbar from "../Explore/Navbar";
import SideBar from "../Explore/SideBar";
import Dropdown from "../Explore/Dropdown";
import authService from "../../Services/Auth";
import { useNavigate } from "react-router-dom";

const Live = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [activeMode, setActiveMode] = useState(null);
  const baseUrl = process.env.REACT_APP_BASEURL;

  const navigate = useNavigate();

  const getCurrentUser = useCallback(async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.data);
      setLoading(false);
      console.log(user, data.data);
    } else {
      console.log("Something went wrong.............");
    }
  }, [baseUrl, user]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  useEffect(() => {
    getCurrentUser();

    const authenticated = authService.isAuthenticated();
    !authenticated ? setAuth(false) : setAuth(true);
  }, [auth]);

 

  return (
    <div className="main-content flex flex-row justify-items-center items-start bg-white min-h-screen">
      <SideBar auth={auth} setAuth={setAuth} user={user} />
      <div className="flex flex-col ml-24 w-full">
        <Navbar
          toggleDropdown={toggleDropdown}
          auth={auth}
          setAuth={setAuth}
          user={user}
        />
        {isDropdownOpen && <Dropdown auth={auth} setAuth={setAuth} />}
        <div className="container">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10">
            <div className="min-h-screen flex flex-col justify-center items-center gap-y-4 pt-10">
              <div className="flex flex-col items-center">
                <h1>Select Your Conference Mode</h1>
                <h3>Choose between live or web conferencing to suit your needs</h3>
              </div>

              {/* Button Container */}
              <div className="relative flex border rounded-lg overflow-hidden button-group">
                <button
                  onClick={() => setActiveMode('live')}
                  className={`button ${activeMode === 'live' ? 'active' : ''}`}
                >
                  Live Conferencing
                </button>
                <button
                  onClick={() => setActiveMode('web')}
                  className={`button ${activeMode === 'web' ? 'active' : ''}`}
                >
                  Web Conferencing
                </button>
              </div>

              {activeMode === 'live' && (
                <div className="flex flex-col items-center gap-y-4 pt-10">
                  <h1>Engage face to face in real time</h1>
                  <div className="flex flex-col gap-4">
                    <button
                       onClick={() => navigate('/StartLive')}
                      className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      Start an instant Live
                    </button>
                    <button
                      onClick={() => navigate('/ScheduleForm')}
                      className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Schedule with Calendar
                    </button>
                  </div>
                </div>
              )}

              {activeMode === 'web' && (
                <div className="flex flex-col items-center gap-y-4 pt-10">
                  <h1>Running a webinar with your students</h1>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => navigate('/StartWebinar')}
                      className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      Start Webinar
                    </button>
                    <button
                      onClick={() => navigate('/ScheduleForm')}
                      className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Schedule with Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
