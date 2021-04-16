import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {MyView} from '../../components';
import {Title, Button} from 'react-native-paper';
import {AppContext} from '../../contexts/AppContext';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const {currentUser} = useContext(AppContext);

  return (
    <MyView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{color: 'white'}}>
        {currentUser.displayName ? `Hello, ${currentUser.displayName}!` : null}
      </Title>
      <Button
        style={{backgroundColor: 'white', marginTop: 12}}
        onPress={() => {
          navigation.replace('SignIn');
          auth()
            .signOut()
            .then(res => {
              console.log(JSON.stringify(res, null, 5));
            })
            .catch(error => {
              console.log(JSON.stringify(error, null, 5));
            });
        }}>
        Sign Out
      </Button>
    </MyView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
