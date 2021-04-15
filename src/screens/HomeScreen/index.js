import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MyView} from '../../components';
import auth from '@react-native-firebase/auth';
import {Text, Button} from 'react-native-paper';

const currentUser = auth().currentUser;

const HomeScreen = ({navigation}) => {
  return (
    <MyView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white'}}>Hello, {currentUser.displayName}!</Text>
      <Button
        style={{backgroundColor: 'white', marginTop: 12}}
        onPress={async () =>
          await auth()
            .signOut()
            .then(res => {
              console.log(JSON.stringify(res, null, 5));
              navigation.replace('SignIn');
            })
            .catch(error => {
              console.log(JSON.stringify(error, null, 5));
            })
        }>
        Sign Out
      </Button>
    </MyView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
