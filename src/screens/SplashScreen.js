import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {Title} from 'react-native-paper';
import {PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {FocusAwareStatusBar} from '../components';
import {Background, LogoFull, LogoSNAPI} from '../assets';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const responsiveSize = width > height ? width * 0.4 : height * 0.4;

const SplashScreen = () => {
  return (
    <View style={styles.wrapper}>
      <FocusAwareStatusBar animated={true} hidden={true} />
      <ImageBackground
        source={Background}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.container}>
          <Animatable.View style={styles.header} animation="bounceIn">
            <Image style={styles.logo} source={LogoFull} resizeMode="contain" />
          </Animatable.View>
        </View>
        <View style={styles.footer}>
          <Title style={styles.title}>{'P O W E R E D   B Y'}</Title>
          <Image style={styles.snapi} source={LogoSNAPI} resizeMode="contain" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  wrapper: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR_DARK,
  },
  title: {
    color: 'white',
    fontFamily: 'Atkinson-Hyperlegible-Regular',
    fontSize: 26,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 64,
    width: responsiveSize,
    height: responsiveSize,
  },
  snapi: {
    width: responsiveSize,
    height: 75,
  },
});
