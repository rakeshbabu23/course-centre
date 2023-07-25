import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

function ContextProvider({ children }) {
  const [admin, setAdmin] = useState("");
  const [courses, setCourses] = useState([]);
  const [adminError, setAdminError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        admin: admin,
        courses,
        setCourses,
        setAdmin,
        adminError,
        setAdminError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

function useAdmin() {
  const context = useContext(AdminContext);
  return context;
}
export { ContextProvider, useAdmin };
