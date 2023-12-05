import React, { useEffect, useState } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Offline from "../../Components/Announcement/Offline";

const ReduxProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return <Provider store={store}>{isOnline ? children : <Offline />}</Provider>;
};

export default ReduxProvider;
