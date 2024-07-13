import Notification from "../../assets/icons/Notification.png";
import Ellipse from "../../assets/Ellipse.png";

const Navbar = ({ toggleDropdown, auth }) => {

  return (
    <div className="flex flex-1 position-top bg-white p-4 justify-between items-center  w-full">
      <input
        type="text"
        placeholder="Search"
        className="mr-10 border border-gray-300 outline-none rounded-md bg-gray-50  w-1/4 h-12 px-6"
      />
      <div>
        {!auth ? (
          <button className="bg-purple-900 text-white px-4 py-1 rounded-lg mx-auto h-12">
            Sign Up
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <img src={Notification} alt="Notifications" className="w-6 h-6" />
            <img
              src={Ellipse}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
