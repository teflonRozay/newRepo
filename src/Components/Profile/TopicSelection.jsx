import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topicsList = [
  "Product design",
  "Baking",
  "Knitting",
  "Painting",
  "Animation",
  "UI/UX",
  "Video editing",
  "Miro",
  "Html",
  "Marketing",
  "Phonics",
  "AI",
  "Figma",
];

const TopicSelection = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [search, setSearch] = useState("");
  const baseUrl = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  let user = localStorage.getItem("currentuser");
  user = JSON.parse(user);

  const handleSave = async (e) => {
    e.preventDefault();
    const requestBody = { interest: selectedTopics, firstName: user.firstName };
    console.log("this user body:", requestBody.firstName);

    const formdata = new FormData();
    formdata.append("firstName", user.firstName);
    formdata.append("lastName", user.lastName);
    formdata.append("bio", user.bio);
    formdata.append("interest", selectedTopics);
    formdata.append("role", user.role);

    const response = await fetch(`${baseUrl}/profiles`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formdata,
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Error updating profile:", data);
      return;
    } else {
      toast.success("Profile updated successfully!");
      navigate("/");
      // console.log("Profile updated successfully!");
    }
  };

  const filteredTopics = topicsList.filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="h-screen  flex  flex-col items-center w-full   border">
        <div className="px-40 shadow-sm py-28">
          <h2 className="text-2xl font-semibold mb-4">Almost done!</h2>
          <p className="mb-4 text-gray-600">
            Select topics of your interest to personalize your experience.
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="mb-4 w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <div className="flex flex-wrap justify-center max-w-sm mb-4">
            {filteredTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`m-2 px-4 py-1 border border-gray-300 rounded-full shadow-sm ${
                  selectedTopics.includes(topic)
                    ? "bg-blue-300 text-black"
                    : "bg-white text-gray-700 text-sm"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="w-full max-w-md m-1 bg-blue-900 text-white py-2 px-4 rounded-md mb-2"
          >
            Save and Continue
          </button>
          <button className="w-full max-w-md bg-transparent m-1 border border-gray-200 text-gray-600 py-2 px-4 rounded-md">
            Skip to do these later
          </button>
          <div className="mt-2 items-center text-gray-600 text-sm max-w-sm px-6">
            <p>
              you can skip this process now later you can set up your profile in
              the profile settings
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicSelection;
