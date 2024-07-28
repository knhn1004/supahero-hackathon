"use client";
import supabase from "@/hooks/supabase";
// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
// import { onAuthChange } from "../hooks/supabase";
// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   onAuthChange();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        console.log("intial session");
      } else if (event === "SIGNED_IN") {
        console.log("signed in");
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        console.log("signed out");
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    data.subscription.unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  return useContext(UserContext);
};
