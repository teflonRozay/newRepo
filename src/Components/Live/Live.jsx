import { useEffect, useState, useCallback } from "react";
import "../../styles/LiveUpdate.css";
import Navbar from "../Explore/Navbar";
import SideBar from "../Explore/SideBar";
import Dropdown from "../Explore/Dropdown";
import authService from "../../Services/Auth";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const baseUrl = process.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
  const handleLive = () => {
    navigate("/ScheduleForm");
    console.log("Schedule");
  };

  const startLive = () => {
    navigate("/Live");
    console.log("Schedule");
  };

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
        <div className="container  ">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10 ">
            <div className="min-h-screen flex flex-col justify-center items-center gap-y-4 pt-10">
              <div className="flex flex-col items-center">
                <h1>Please select the purpose of the live Session</h1>
                <h3>Are you starting an instant meeting or scheduling one?</h3>
              </div>
              <button
                onClick={startLive}
                className="border border-purple-700 rounded p-2  w-80"
              >
                Start an instant webinar
              </button>
              <button
                onClick={handleLive}
                className="border hover:border-purple-700 rounded p-2  w-80"
              >
                Schedule with calender
              </button>

              <h1 className="font-bold text-2xl">Sessions you have created</h1>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4">
                  <img
                    src="https://via.placeholder.com/200x200"
                    alt="Meeting"
                    className="w-full h-full object-cover"
                  />
                  <h2 className="text-gray-600 text-sm">Meeting Title</h2>
                  <p className="text-gray-500 text-xs">Date and Time</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <img
                    src="https://via.placeholder.com/200x200"
                    alt="Meeting"
                    className="w-full h-full object-cover"
                  />
                  <h2 className="text-gray-600 text-sm">Meeting Title</h2>
                  <p className="text-gray-500 text-xs">Date and Time</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <img
                    src="https://via.placeholder.com/200x200"
                    alt="Meeting"
                    className="w-full h-full object-cover"
                  />
                  <h2 className="text-gray-600 text-sm">Meeting Title</h2>
                  <p className="text-gray-500 text-xs">Date and Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
