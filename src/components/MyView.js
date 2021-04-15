import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Background} from '../assets';
import {PRIMARY_COLOR_DARK} from '../assets/static/colors';

const MyView = ({children, style = {}}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover">
          <View style={style}>{children}</View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MyView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR_DARK,
  },
});
