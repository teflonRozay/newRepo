import Navbar from "./Navbar";
import Post from "./Post";
import SideBar from "./SideBar";
import Comments from "./Comments";
import imageBike from "../../assets/imageBike.png";
import image4 from "../../assets/image4.png";
import imageCrowd from "../../assets/imageCrowd.png";
import imageFood from "../../assets/imageFood.png";
import userpix from "../../assets/userpix.png";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import authService from "../../Services/Auth";

const MainScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    !authenticated ? setAuth(false) : setAuth(true);
  }, [auth]);

  const comments = [
    {
      profilePic: userpix,
      author: "Ralph Edwards",
      date: "Aug 19, 2021",
      text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...",
    },
    {
      profilePic: userpix,
      author: "Ralph Edwards",
      date: "Aug 19, 2021",
      text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...",
    },
    // Add more comments as needed
  ];
  return (
    <div className="main-content flex flex-row justify-items-center items-start bg-white min-h-screen">
      <SideBar auth={auth} setAuth={setAuth} />
      <div className="flex flex-col ml-24">
        <Navbar toggleDropdown={toggleDropdown} auth={auth} setAuth={setAuth} />
        <div className="container  ">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10 ">
            <Post
              className="col-span-1 md:w-2/3 py-2 rounded border"
              image={imageBike}
              profilePic={userpix}
              title="How to ride a bike i summer"
              description="#byp #biker #bikergirls #bikerboys #bikerpeople #bikerchick #bikerclown #bikerwarrior"
              author="John Doe"
              likes="243.7k"
              comments="2156"
              pin="188.9k"
              views="202.2k"
              shares="202.2k"
            />
            <Post
              className="col-span-1 md:w-2/3 py-2 rounded border"
              image={image4}
              profilePic={userpix}
              title="Top 10 detailed list for pennies"
              author="Jane Smith"
              description="#byp #biker #bikergirls #bikerboys #bikerpeople #bikerchick #bikerclown #bikerwarrior"
              likes="243.7k"
              comments="2156"
              pin="188.9k"
              views="202.2k"
              shares="202.2k"
            />

            <Post
              className="col-span-1  md:w-2/3 py-2 rounded border"
              image={imageCrowd}
              profilePic={userpix}
              title="Etiquette of greeting in public"
              author="Mark Johnson"
              description="#byp #biker #bikergirls #bikerboys #bikerpeople #bikerchick #bikerclown #bikerwarrior"
              likes="243.7k"
              comments="2156"
              pin="188.9k"
              views="202.2k"
              shares="202.2k"
            />
            <Post
              className="col-span-1 md:w-2/3 py-2 rounded border"
              image={imageFood}
              profilePic={userpix}
              title="How to code in python"
              author="David Wood"
              description="#byp #biker #bikergirls #bikerboys #bikerpeople #bikerchick #bikerclown #bikerwarrior"
              likes="243.7k"
              comments="2156"
              pin="188.9k"
              views="202.2k"
              shares="202.2k"
            />
            <Comments comments={comments} />
            {isDropdownOpen && <Dropdown />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainScreen;
