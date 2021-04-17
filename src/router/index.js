import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  HomeScreen,
  DetailScreen,
} from '../screens';
import {AppContext} from '../contexts';
import {LoadingIndicator} from '../components';

const Stack = createStackNavigator();

const Router = () => {
  const {currentUser} = useContext(AppContext);

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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
