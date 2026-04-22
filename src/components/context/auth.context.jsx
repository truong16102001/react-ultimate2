import { createContext, useContext, useState } from "react";

// 1. create context
export const AuthContext = createContext(null);

// 2. provider
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // login
  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem("access_token", userData.access_token);
    // lưu localStorage (optional)
    //localStorage.setItem("user", JSON.stringify(userData.user));
  };

  // logout
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    isAppLoading,
    setIsAppLoading,
  };
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};