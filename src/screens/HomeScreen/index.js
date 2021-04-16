import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {MyView} from '../../components';
import {Title, Button} from 'react-native-paper';
import {AppContext} from '../../contexts/AppContext';

const HomeScreen = ({navigation}) => {
  const {currentUser, signOut} = useContext(AppContext);

  return (
    <MyView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{color: 'white'}}>
        {currentUser.displayName ? `Hello, ${currentUser.displayName}!` : null}
      </Title>
      <Button
        style={{backgroundColor: 'white', marginTop: 12}}
        onPress={signOut}>
        Sign Out
      </Button>
    </MyView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
