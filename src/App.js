import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {AuthProvider} from './contexts';

const App = ({CombinedDefaultTheme}) => {
  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
