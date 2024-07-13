import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function Socket({ username }) {
  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const ws = io(`ws://www.cloud.stridez.ca`, {
    // const ws = io(`ws://localhost:8080`, {
      autoConnect: false,
      withCredentials: true,
      auth: {
        token,
      },
    });

    wsRef.current = ws;

    try {
      ws.connect();

      ws.on("auth_error", (error) => {
        setError(error);
        console.error("WebSocket authentication error:", error);
      });

      ws.on("suggested_username_response", (response) => {
        setResponse(response);
        setLoading(false);
        console.log("suggested names... from db", response.status, response.data);
        console.log("suggestedUsernames.....", suggestedUsernames);
        setSuggestedUsernames(response.data);
      });

      ws.on("connect_error", (error) => {
        setError(error);
        setLoading(false);
        console.error("WebSocket error:", error);
      });
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }

    return () => {
      ws.disconnect();
    };
  }, [suggestedUsernames]);

  useEffect(() => {
    console.log("WebSocket username:", username, wsRef.current);
    if (wsRef.current && username?.length > 0) {
      console.log("true.............................. request", username);
      setLoading(true);
      wsRef.current.emit("suggest_username_request", username, () => {
        // Optional callback function after emitting
      });
    }
  }, [username]);

  return (
    <>
      <div className="px-4 pt-4 text-xl">
        {loading ? (
          <p className="text-sm">loading...</p>
        ) : (
          response.status === "Success" &&
          suggestedUsernames.length > 0 && (
            <div>
              <p className="text-[1rem] text-purple-600 font-semibold">
                {response.message}
              </p>
              <span className="text-sm italic">
                {typeof suggestedUsernames !== "string" &&
                  suggestedUsernames.join(", ")}
              </span>
            </div>
          )
        )}

        {response.status === "Error" && (
          <div>
            <p className="text-[1rem] text-purple-600 font-bold font-sembold">
              😔 {response.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Socket;
