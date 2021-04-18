import React, {useEffect, useState, useContext} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {HomeContext} from '../../contexts';
import * as Animatable from 'react-native-animatable';
import {ListNews} from '../../components';
import {useIsFocused} from '@react-navigation/core';

const ReportScreen = ({navigation}) => {
  const {reports, reportsSize, setFocusedTab} = useContext(HomeContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setFocusedTab('Report');
  }, [isFocused]);

  return (
    <Animatable.View animation="fadeInUpBig" style={styles.container}>
      <ListNews data={reports} navigation={navigation} size={reportsSize} />
    </Animatable.View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 12,
    marginTop: -12,
  },
});
