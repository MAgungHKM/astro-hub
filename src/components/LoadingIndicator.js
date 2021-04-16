import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Dialog, Portal} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {PRIMARY_COLOR} from '../assets/static/colors';

const LoadingIndicator = ({isLoading}) => {
  return (
    <Portal>
      <Dialog visible={isLoading} dismissable={false} style={styles.dialog}>
        <Dialog.Content>
          <ActivityIndicator
            size="large"
            style={styles.indicator}
            theme={indicatorTheme}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    marginTop: 64,
    marginBottom: 'auto',
    borderRadius: 32,
  },
  indicator: {margin: 8},
});

const indicatorTheme = {colors: {primary: PRIMARY_COLOR}};
