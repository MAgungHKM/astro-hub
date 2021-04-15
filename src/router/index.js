import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, SignInScreen, SignUpScreen, HomeScreen} from '../screens';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
