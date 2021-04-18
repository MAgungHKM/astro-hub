import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {useContext} from 'react/cjs/react.development';
import {HomeContext} from '../../contexts';
import * as Animatable from 'react-native-animatable';
import {ListNews} from '../../components';
import {useIsFocused} from '@react-navigation/core';

const ArticleScreen = ({navigation}) => {
  const {articles, articlesSize, setFocusedTab} = useContext(HomeContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setFocusedTab('Article');
  }, [isFocused]);

  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={[styles.container, {height: articles.length === 0 ? 1000 : null}]}>
      <ListNews data={articles} navigation={navigation} size={articlesSize} />
    </Animatable.View>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 12,
    marginTop: -12,
  },
});
