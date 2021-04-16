import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {AppProvider} from './contexts/AppContext';

const App = ({CombinedDefaultTheme}) => {
  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <AppProvider>
        <Router />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
