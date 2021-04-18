import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  DetailScreen,
  MainAppScreen,
} from '../screens';
import {AuthContext} from '../contexts';
import {LoadingIndicator} from '../components';

const Stack = createStackNavigator();

const Router = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{animationEnabled: false}}
      />
      <Stack.Screen name="MainApp" component={MainAppScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
