import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { axiosBackendInstance } from "../lib/api";

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ isLoggedIn: null, id: null, email: null });

  useEffect(() => {
    const getUser = async () => {
      await axiosBackendInstance.get("/user/me").then((response) => {
        setUser({ isLoggedIn: true, id: response.data?.id, email: response.data?.email });
      });
    };

    if (window.localStorage.getItem("accessToken")) getUser();
  }, [user.isLoggedIn]);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}
