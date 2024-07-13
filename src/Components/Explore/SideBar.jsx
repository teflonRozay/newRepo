import { useState } from "react";
import { Link } from "react-router-dom";
import SVG1 from "../../assets/icons/SVG1.svg";
import SVG from "../../assets/icons/SVG.svg";
import user from "../../assets/icons/user.svg";
import logo from "../../assets/logo.png";
import video from "../../assets/icons/video.png";
import personicon from "../../assets/icons/personicon.png";
import Divider from "../../assets/Divider.png";
import authService from "../../Services/Auth";
import { useNavigate } from "react-router-dom";
import Toastify from "../Toastify";

const Sidebar = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const handleLogout = () => {
    if (auth) {
      authService.logout();
      setAuth(false);
      setAlert("Logged out Successfully");
    } else {
      navigate("/Auth");
    }
  };

  const handleNav = (link) => {
    window.location.href = link;
  };

  const menuItems = [
    { title: "Explore For You", icon: SVG1, tag: "", link: "" },
    { title: "Following", icon: SVG, tag: "New" },
    { title: "Subscribe to", icon: user, tag: "", link: "" },
    { title: "LIVE", icon: video, tag: "", link: "/StartLive" },
    { title: "Profile", icon: personicon, tag: "", link: "" },
  ];

  return (
    <div className="sidebar fixed top-0 left-0 h-full grid grid-rows-[auto,1fr,auto] justify-start items-center gap-y-4  px-5 bg-white pb-8 border">
      <Toastify message={alert} />

      <div className="mb-6 ">
        <div className="flex items-center justify-start pb-4">
          <img src={logo} alt="Logo" className="w-40 h-14 py-2" />
        </div>

        <ul className="mt-2 ">
          <div className="gap-y-4 space-y-2">
            {menuItems &&
              menuItems.map((item, index) => {
                return (
                  <li
                    onClick={() => handleNav(item.link)}
                    className="py-2 flex items-center rounded-lg hover:text-purple-700 hover:bg-gray-100  p-2 hover:cursor-pointer h-12 "
                    key={index}
                  >
                    <img src={item.icon} alt="" className="mr-2" />

                    <Link to={item.link} className="ml-2 ">
                      <span>{item.title}</span>
                    </Link>
                    {item.tag ? (
                      <span className="ml-auto text-sm bg-blue-100 text-blue-900 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
          </div>
        </ul>
      </div>

      <img src={Divider} alt="Horinzontal Divider" className="mt-4 mb-4" />

      <div className="mt-4">
        {!auth && (
          <p className="text-gray-500 mb-2 text-xs">
            Log in to follow Guides, like videos, and view comments.
          </p>
        )}
        <button
          className="w-full bg-transparent text-fray-400 px-4 py-2 rounded border-2 border-purple-700  hover:bg-gray-500"
          onClick={() => handleLogout()}
        >
          {auth ? "Logout" : "Log in"}
        </button>
      </div>

      <div className="mt-8">
        <ul className="text-xs text-gray-600">
          <Link to="/explore">
            {" "}
            <span className="py-1">Company</span>
          </Link>
          <span className="py-1 px-2">About</span>
          <span className="py-1">Contact</span>
        </ul>
        <ul className="mt-4 text-xs text-gray-600">
          <li className="font-bold text-xs mb-2">Terms & Policies</li>
          <span className="py-1 px-1 mt-2">Help</span>
          <span className="py-1  mt-2">Safety</span>
          <span className="py-1 px-1">Privacy</span>
          <span className="py-1 px-1">Center</span>
        </ul>
        <div className="mt-4 text-xs text-gray-500">
          <p>Community Guidelines</p>
          <p className="mt-2">© 2024 STRIDEZ</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
