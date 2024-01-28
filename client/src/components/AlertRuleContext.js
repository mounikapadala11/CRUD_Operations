// AlertRuleContext.js
import React, { createContext, useState, useContext } from 'react';

const AlertRuleContext = createContext();

export const useAlertRule = () => useContext(AlertRuleContext);

export const AlertRuleProvider = ({ children }) => {
  const [currentAlertRule, setCurrentAlertRule] = useState(null);

  const setAlertRule = (rule) => {
    setCurrentAlertRule(rule);
  };

  return (
    <AlertRuleContext.Provider value={{ currentAlertRule, setAlertRule }}>
      {children}
    </AlertRuleContext.Provider>
  );
};
