import { createContext, useContext, useState } from "react";

// 1. create context
export const AuthContext = createContext(null);

// 2. provider
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  // login
  const login = (userData) => {
    setUser(userData);
    // lưu localStorage (optional)
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // load lại khi refresh
  const loadUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loadUser,
    isAuthenticated: !!user,
  };
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};