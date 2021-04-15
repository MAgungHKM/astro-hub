import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
