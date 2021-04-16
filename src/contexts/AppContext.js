import React, {createContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const onAuthStateChanged = user => {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () =>
    await auth()
      .signOut()
      .then(res => {
        console.log(JSON.stringify(res, null, 5));
        navigation.replace('SignIn');
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 5));
      });

  if (initializing) return null;

  return (
    <AppContext.Provider value={{currentUser, setCurrentUser, signOut}}>
      {children}
    </AppContext.Provider>
  );
};
