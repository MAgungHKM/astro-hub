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

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Atkinson-Hyperlegible-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Atkinson-Hyperlegible-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Atkinson-Hyperlegible-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Atkinson-Hyperlegible-Regular',
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

export default function Main() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <App theme={CombinedDefaultTheme} />
    </PaperProvider>
  );
}
