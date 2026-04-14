import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

// Simple admin credentials - change these!
const ADMIN_PASSWORD = "123456";

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("osp-admin") === "true";
  });

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("osp-admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("osp-admin");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
