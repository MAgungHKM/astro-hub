import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const DetailScreen = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{data.title}</Text>
      <Button onPress={() => navigation.pop()}>GO BACK</Button>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
