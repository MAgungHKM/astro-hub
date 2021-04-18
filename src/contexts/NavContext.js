import React, {createContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const NavContext = createContext();

export const NavProvider = ({children}) => {
  const [navTarget, setNavTarget] = useState('Home');
  const [currentNav, setCurrentNav] = useState('Home');

  return (
    <NavContext.Provider
      value={{navTarget, setNavTarget, currentNav, setCurrentNav}}>
      {children}
    </NavContext.Provider>
  );
};
