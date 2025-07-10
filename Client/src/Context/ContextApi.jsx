
import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <MyContext.Provider value={{currentUser, setCurrentUser }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };