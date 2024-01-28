import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [currentAlert, setCurrentAlert] = useState(null);

  return (
    <AlertContext.Provider value={{ currentAlert, setCurrentAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
