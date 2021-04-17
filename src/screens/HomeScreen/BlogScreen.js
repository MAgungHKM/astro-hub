import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {useContext} from 'react/cjs/react.development';
import {HomeContext} from '../../contexts';
import * as Animatable from 'react-native-animatable';
import {ListNews} from '../../components';

const BlogScreen = ({navigation}) => {
  const {blogs} = useContext(HomeContext);

  return (
    <Animatable.View animation="fadeInUpBig" style={styles.container}>
      <ListNews data={blogs} navigation={navigation} />
    </Animatable.View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 12,
    marginTop: -12,
  },
});
