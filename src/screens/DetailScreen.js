import React, {useRef} from 'react';
import {
  BackHandler,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text, Title, TouchableRipple} from 'react-native-paper';
import {Header} from '../assets';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {FocusAwareStatusBar} from '../components';
import Feather from 'react-native-vector-icons/Feather';
import {BOLD_TEXT, REGULAR_TEXT} from '../assets/static/fonts';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/core';

const DetailScreen = ({navigation, route}) => {
  const {data} = route.params;

  const _container = useRef(null);
  const _image = useRef(null);
  const _back = useRef(null);
  const _title = useRef(null);
  const _time = useRef(null);
  const _summary = useRef(null);
  const _source = useRef(null);

  const headToSource = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const handleGoBack = () => {
    _back.current.bounceOut(750);
    setTimeout(() => {
      _source.current.fadeOutDownBig();
      _summary.current.fadeOutDownBig();
      _time.current.fadeOutDownBig();
      _title.current.fadeOutDownBig();
      _image.current.fadeOutUpBig().then(() => navigation.pop());
    }, 650);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleGoBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeIn"
      ref={_container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <FocusAwareStatusBar
          translucent
          animated={true}
          backgroundColor="transparent"
        />
        <Animatable.Image
          animation="fadeInDownBig"
          delay={500}
          source={{uri: data.imageUrl}}
          style={styles.image}
          resizeMode="cover"
          ref={_image}
        />
        <Animatable.View
          style={styles.backButtonWrapper}
          animation="bounceIn"
          delay={2000}
          ref={_back}>
          <TouchableRipple
            borderless
            style={styles.backButtonContainer}
            onPress={handleGoBack}>
            <Feather name="chevron-left" size={42} color={PRIMARY_COLOR} />
          </TouchableRipple>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig" delay={900} ref={_title}>
          <Title style={styles.title}>{data.title}</Title>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUpBig"
          delay={1100}
          style={styles.sourceContainer}
          ref={_time}>
          <Text style={styles.sourceText}>{'by '}</Text>
          <Text style={[styles.sourceText, styles.sourceBold]}>
            {data.newsSite}
          </Text>
          <Text style={styles.sourceText}>
            {' — '}
            {formatDate(data.updatedAt)}
          </Text>
        </Animatable.View>
        <Animatable.Text
          animation="fadeInUpBig"
          delay={1300}
          style={styles.summary}
          ref={_summary}>
          {data.summary}
        </Animatable.Text>
        <Animatable.View
          animation="fadeInUpBig"
          delay={1500}
          style={styles.buttonWrapper}
          ref={_source}>
          <TouchableRipple
            borderless
            style={styles.buttonContainer}
            onPress={() => headToSource(data.url)}>
            <Title style={styles.buttonText}>Head to Source</Title>
          </TouchableRipple>
        </Animatable.View>
      </ScrollView>
    </Animatable.View>
  );
};

const formatDate = date => {
  const d = new Date(date);

  return `${d.getDateWithSuffix()} ${d.getMonthText()} ${d.getFullYear()}`;
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 275,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 26,
    marginHorizontal: 24,
    marginTop: 12,
    textAlign: 'justify',
  },
  sourceContainer: {flexDirection: 'row', marginHorizontal: 24, marginTop: 4},
  sourceText: {
    fontSize: 16,
  },
  sourceBold: {
    color: PRIMARY_COLOR_DARK,
    fontFamily: BOLD_TEXT,
  },
  backButtonWrapper: {
    position: 'absolute',
    backgroundColor: 'white',
    top: StatusBar.currentHeight + 24,
    left: 24,
    elevation: 12,
    borderRadius: 12,
  },
  backButtonContainer: {
    borderRadius: 12,
  },
  summary: {
    marginHorizontal: 24,
    marginTop: 12,
    marginBottom: 24,
    textAlign: 'justify',
    fontSize: 20,
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 24,
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: REGULAR_TEXT,
    color: PRIMARY_COLOR,
    fontSize: 26,
  },
});

Date.prototype.getMonthText = function () {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[this.getMonth()];
};

Date.prototype.getDateWithSuffix = function () {
  const nth = d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${this.getDate()}${nth(this.getDate())}`;
};
