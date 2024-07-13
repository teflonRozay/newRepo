/* eslint-disable react/prop-types */
import { useState } from "react";
import headhat from "../../assets/headhat.png";
import backimage from "../../assets/backimage.png";
import Bikere from "../../assets/Bikere.png";
import guidecom from "../../assets/guidecom.png";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import CommentSignin from "./CommentSignin";
import Dropdown from "./Dropdown";

const MainCommentSign = () => {
  const comments = [
    {
      username: "Ralph Edwards",
      date: "Aug 19, 2024",
      text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique",
      replies: [
        {
          username: "Ralph Edwards",
          date: "Aug 19, 2024",
          text: " In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.",
        },
        {
          username: "Ralph Edwards",
          date: "Aug 19, 2024",
          text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.",
        },
      ],
    },

    // Add more comments as needed
  ];

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleDropdown={toggleDropdown} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <SideBar className="md:col-span-1" />
        <div className="md:col-span-3 grid grid-cols-1 gap-2">
          <div className="relative">
            <img
              src={backimage}
              alt="Background"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <img
                src={Bikere}
                alt="Overlay"
                className="w-auto h-full object-contain"
              />
            </div>
          </div>
          <div className="relative bg-white z-10 p-4">
            <div className="flex items-center space-x-4 mt-4 text-black">
              <img
                src={headhat}
                alt="User profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div>
                  <b>Kambeani</b> Kimberly
                </div>
                <div className="text-sm text-black-300">
                  <p>How to ride a bike in summer</p>
                </div>
                <div className="flex space-x-1  mt-2 text-xs text-blue-700">
                  <span>#fyp</span>
                  <span>#biker</span>
                  <span>#bikerboys</span>
                  <span>#bikerboysoftiktok</span>
                </div>
                <div className="flex space-x-1  mt-2 text-xs text-blue-700">
                  <span>#bikerboys</span>
                  <span>#bikerchicks</span>
                  <span>#bikerboys</span>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  className="bg-white border border-purple-950 text-purple-900 py-1 px-4 rounded"
                  onClick={handleSubscribe}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex space-x-2 items-center mb-4">
                <h2 className="text-xl font-bold underline decoration-2 decoration-purple-900 py-3">
                  Comments (5248)
                </h2>
                <h2 className="flex items-center text-xl font-medium py-3">
                  Guide Videos
                </h2>
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={guidecom}
                  alt="User profile"
                  className="w-10 h-10 rounded-full mx-20"
                />
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="flex-grow h-12 bg-white rounded-full w-3/4 py-2 px-4 outline-none"
                />
                <div className="mr-20">
                  <button className="bg-purple-900 text-white py-2 px-4 rounded-full">
                    Post
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg">
                {comments.map((comment, index) => (
                  <CommentSignin key={index} {...comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDropdownOpen && <Dropdown />}
    </div>
  );
};

export default MainCommentSign;
