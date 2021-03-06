import * as React from 'react';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {DefaultTheme as NavigationDefaulTheme} from '@react-navigation/native';
import App from './src/App';
import merge from 'deepmerge';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from './src/assets/static/colors';
import firebase from '@react-native-firebase/app';
import {BOLD_TEXT, REGULAR_TEXT} from './src/assets/static/fonts';

const fontConfig = {
  web: {
    regular: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: BOLD_TEXT,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: BOLD_TEXT,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: BOLD_TEXT,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: REGULAR_TEXT,
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    primary: PRIMARY_COLOR,
  },
};

const CombinedDefaultTheme = merge(theme, NavigationDefaulTheme);

const firebaseConfig = {
  apiKey: 'AIzaSyByVmJZHLKdW9vGO6n5OfrO7BUw1ZGuwTY',
  authDomain: 'astro-hub-hkm.firebaseapp.com',
  databaseURL: 'https://astro-hub-hkm-default-rtdb.firebaseio.com',
  projectId: 'astro-hub-hkm',
  storageBucket: 'astro-hub-hkm.appspot.com',
  messagingSenderId: '1058723292471',
  appId: '1:1058723292471:web:35f7436297af7d6539e6b2',
  measurementId: 'G-VTD37LJWYW',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app;

export default function Main() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <App theme={CombinedDefaultTheme} />
    </PaperProvider>
  );
}
