"use client";

import React from "react";
import { useEffect, useState } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Offline from "../../Components/Announcement/Offline";

const ReduxProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => setIsOnline(true));
      window.addEventListener("offline", () => setIsOnline(false));

      return () => {
        window.removeEventListener("online", () => setIsOnline(true));
        window.removeEventListener("offline", () => setIsOnline(false));
      };
    }
  }, []);

  return <Provider store={store}>{isOnline ? children : <Offline />}</Provider>;
};

export default ReduxProvider;
