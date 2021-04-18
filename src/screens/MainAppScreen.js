import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import {TouchableRipple, Text} from 'react-native-paper';
import {REGULAR_TEXT} from '../assets/static/fonts';
import Feather from 'react-native-vector-icons/Feather';
import {PRIMARY_COLOR} from '../assets/static/colors';
import {NavContext, NavProvider} from '../contexts';
import Animated from 'react-native-reanimated';

const BottomTab = createBottomTabNavigator();

const MainAppScreen = () => (
  <NavProvider>
    <MainApp />
  </NavProvider>
);

const MainApp = () => {
  const {currentNav, setNavTarget, setCurrentNav} = useContext(NavContext);

  return (
    <BottomTab.Navigator
      backBehavior="firstRoute"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        style: {
          backgroundColor: 'white',
          borderRadius: 32,
          borderTopWidth: 0,
          position: 'absolute',
          left: 48,
          right: 48,
          bottom: 16,
          height: 64,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: ({name, onPress}) => (
            <View style={{flex: 1, borderRadius: 32}}>
              <TouchableRipple
                borderless
                style={{
                  flex: 1,
                  borderRadius: 32,
                }}
                onPress={() => {
                  setNavTarget('Home');
                  setTimeout(() => {
                    onPress();
                    setCurrentNav('Home');
                  }, 750);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: currentNav === 'Home' ? 1 : 0.5,
                  }}>
                  <Feather name="home" size={32} color={PRIMARY_COLOR} />
                  <Text style={{color: PRIMARY_COLOR, fontSize: 16}}>Home</Text>
                </View>
              </TouchableRipple>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: ({name, onPress}) => (
            <View style={{flex: 1, borderRadius: 32}}>
              <TouchableRipple
                borderless
                style={{
                  flex: 1,
                  borderRadius: 32,
                }}
                onPress={() => {
                  setNavTarget('Profile');
                  setTimeout(() => {
                    onPress();
                    setCurrentNav('Profile');
                  }, 750);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: currentNav === 'Profile' ? 1 : 0.5,
                  }}>
                  <Feather name="user" size={32} color={PRIMARY_COLOR} />
                  <Text style={{color: PRIMARY_COLOR, fontSize: 16}}>
                    Profile
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainAppScreen;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
  },
});
