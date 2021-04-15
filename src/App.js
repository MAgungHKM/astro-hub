import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

const App = ({CombinedDefaultTheme}) => {
  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Router />
    </NavigationContainer>
  );
};

export default App;
