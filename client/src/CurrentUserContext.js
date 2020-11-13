import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/me/profile`)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.profile))
      .then(() => setStatus("loaded"))
      .catch((err) => setStatus("error"));

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status, setStatus }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
