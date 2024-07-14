import comment from "../../assets/icons/comment.png";
import heartfill from "../../assets/icons/heartfill.png";
import uncollect from "../../assets/icons/uncollect.png";
import eyefilled from "../../assets/icons/eyefilled.png";
import share from "../../assets/icons/share.png";
import { useEffect, useState } from "react";
import telegram from "../../assets/icons/telegram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import SocialX from "../../assets/icons/SocialX.png";
import link from "../../assets/icons/link.png";
import "../../styles/Post.css";

/* eslint-disable react/prop-types */
const Post = ({
  image,
  profilePic,
  title,
  author,
  pin,
  views,
  likes,
  comments,
  shares,
  className,
  description,
}) => {
  const [mediaClass, setMediaClass] = useState("media-content");
  const [shareOptions, setShareOptions] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleShareMouseEnter = () => {
    setShareOptions(true);
  };
  const handleShareMouseLeave = () => {
    setShareOptions(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (img.width > img.height) {
        setMediaClass("media-content large");
      } else {
        setMediaClass("media-content small");
      }
    };
  }, [image]);

  const postSideMenu = [
    { icon: heartfill, value: likes, alt: "likes" },
    { icon: comment, value: comments, alt: "comments" },
    { icon: uncollect, value: pin, alt: "pinned" },
    { icon: eyefilled, value: views, alt: "views" },
    {
      icon: share,
      value: shares,
      alt: "share",
      onMouseEnter: handleShareMouseEnter,
      onMouseLeave: handleShareMouseLeave,
    },
  ];

  const shareOptionsMenu = [
    { icon: link, alt: "Copy link", text: "Copy link" },
    { icon: whatsapp, alt: "WhatsApp", text: "Share to WhatsApp" },
    { icon: telegram, alt: "Telegram", text: "Share to Telegram" },
    { icon: SocialX, alt: "Facebook", text: "Share to Facebook" },
    { icon: SocialX, alt: "Twitter", text: "Share to Twitter" },
  ];

  return (
    <div
      className={`post-container bg-gray-50 p-4 rounded relative ${className} overflow-hidden`}
    >
      <div className="flex items-center mb-2">
        <img
          src={profilePic}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-600">{author}</h2>
          <h4 className="text-md font-normal text-gray-600">{title}</h4>
          <p className="text-blue-500">{description}</p>
        </div>
        <div className="ml-10 mb-10">
          <button
            className="bg-white border border-purple-950 text-purple-900 py-1 px-4 ml-8 rounded hover:bg-purple-200 hover:cursor-pointer"
            onClick={handleSubscribe}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="media-wrapper">
        <img
          src={image}
          alt={title}
          className={`${mediaClass} w-full h-auto rounded mb-4`}
        />
      </div>

      <div className="side-buttons flex flex-col items-end text-gray-700 font-bold text-xs spacing-y-1">
        {postSideMenu.map((menu, index) => (
          <div
            className="flex flex-col mb-6 cursor-pointer relative items-center"
            key={index}
            onMouseEnter={menu.onMouseEnter}
            onMouseLeave={menu.onMouseLeave}
          >
            <div className="shadow rounded-full p-2 mb-2">
              <img src={menu.icon} alt={menu.alt} className="w-6 h-6" />
            </div>
            {menu.value}
            {menu.alt === "share" && shareOptions && (
              <div className="share-options text-xs font-normal bg-gray-50 shadow-md rounded p-4 space-y-2">
                {shareOptionsMenu.map((option, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <img
                      src={option.icon}
                      alt={option.alt}
                      className="w-4 h-4 hover:bg-purple-200"
                    />
                    <span className="text-nowrap">{option.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
