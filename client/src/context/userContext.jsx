import { createContext, useState } from "react";

export const userContext = createContext()

export const UserProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });
  

  return (
    <userContext.Provider value={{user, setUser}}>
      {props.children}
    </userContext.Provider>
  )
}