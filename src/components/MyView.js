import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Background} from '../assets';
import {PRIMARY_COLOR_DARK} from '../assets/static/colors';

const {width, height} = Dimensions.get('window');

const MyView = ({children, style = {}}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover">
          <View style={style}>{children}</View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyView;

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  wrapper: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR_DARK,
  },
});
