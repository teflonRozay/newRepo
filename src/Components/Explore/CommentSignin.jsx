/* eslint-disable react/jsx-no-undef */

/* eslint-disable react/prop-types */
// import headhat from "../../assets/headhat.png";
import usercom from "../../assets/usercom.png";

// eslint-disable-next-line react/prop-types
const CommentSignin = ({ username, date, text, replies, profilePic }) => (
  <div className="p-4 bg-gray-50 mb-3">
    <div className="flex items-center mb-2">
      <img
        src={profilePic || usercom} // Fallback to userpix if profilePic is not provided
        alt={username}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="w-full bg-white">
        <span className="font-bold mr-2">{username}</span>
        <span className="flex justify-end text-xs text-gray-500">{date}</span>
      </div>
    </div>
    <p className="mb-3 bg-white">{text}</p>
    {replies && replies.length > 0 && (
      <div className="ml-4">
        {replies.map((reply, index) => (
          <CommentSignin key={index} {...reply} profilePic={profilePic} />
        ))}
      </div>
    )}
  </div>
);

export default CommentSignin;
