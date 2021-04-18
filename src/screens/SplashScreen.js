import React, {useContext, useEffect, useRef} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {FocusAwareStatusBar, MyView} from '../components';
import {LogoFull, LogoSNAPI} from '../assets';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../contexts';
import {REGULAR_TEXT} from '../assets/static/fonts';

const {width, height} = Dimensions.get('window');
const responsiveSize = width > height ? width * 0.4 : height * 0.4;

const SplashScreen = ({navigation}) => {
  const {currentUser} = useContext(AuthContext);

  const _logo = useRef(null);
  const _snapi = useRef(null);
  const _footer = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      _snapi.current.pulse();
      _logo.current.tada().then(() => {
        _footer.current.fadeOutDownBig();
        _logo.current
          .bounceOut()
          .then(() => navigation.replace(currentUser ? 'MainApp' : 'SignIn'));
      });
    }, 2000);
  }, []);

  return (
    <MyView style={styles.container}>
      <FocusAwareStatusBar animated={true} hidden={true} />

      <Animatable.View
        style={styles.header}
        animation="bounceIn"
        duration={1500}
        delay={300}
        ref={_logo}>
        <Image style={styles.logo} source={LogoFull} resizeMode="contain" />
      </Animatable.View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUp"
        delay={400}
        onAnimationEnd={() => _snapi.current.fadeIn()}
        ref={_footer}>
        <Title style={styles.title}>{'P O W E R E D   B Y'}</Title>

        <Animatable.Image
          animation="fadeOutDownBig"
          style={styles.snapi}
          source={LogoSNAPI}
          resizeMode="contain"
          ref={_snapi}
        />
      </Animatable.View>
    </MyView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: REGULAR_TEXT,
    fontSize: 26,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 8,
  },
  logo: {
    width: responsiveSize,
    height: responsiveSize,
  },
  snapi: {
    width: responsiveSize,
    height: 75,
  },
});
