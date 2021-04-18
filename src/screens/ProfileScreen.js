import {useIsFocused} from '@react-navigation/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Portal,
  Subheading,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {Credits, FocusAwareStatusBar, MyView} from '../components';
import * as Animatable from 'react-native-animatable';
import {AuthContext, NavContext} from '../contexts';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {IconUser, LogoIcon} from '../assets';
import {BOLD_TEXT} from '../assets/static/fonts';
import Feather from 'react-native-vector-icons/Feather';
import {PROJECT_URL} from '../assets/static/strings';
import auth from '@react-native-firebase/auth';

const screenHeight = Dimensions.get('window').height;

const headToUrl = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

const ProfileScreen = ({navigation}) => {
  const {currentUser} = useContext(AuthContext);
  const {navTarget} = useContext(NavContext);

  const [signOut, setSignOut] = useState(false);
  const [credits, setCredits] = useState(false);

  const showSignOutDialog = () => setSignOut(true);
  const hideSignOutDialog = () => setSignOut(false);

  const showCreditsDialog = () => setCredits(true);
  const hideCreditsDialog = () => setCredits(false);

  const isFocused = useIsFocused();

  const _container = useRef(null);

  useEffect(() => {
    if (isFocused) _container.current.fadeInUpBig();
  }, [isFocused]);

  useEffect(() => {
    if (navTarget !== 'Profile') _container.current.fadeOutDownBig(500);
  }, [navTarget]);

  handleSignOut = () => {
    hideSignOutDialog();
    setTimeout(() => {
      _container.current.fadeOutDownBig(500).then(() => {
        navigation.replace('SignIn');
        setTimeout(() => {
          auth().signOut();
        }, 500);
      });
    }, 500);
  };

  return (
    <MyView style={{flex: 1}}>
      <FocusAwareStatusBar
        translucent
        animated={true}
        backgroundColor={'transparent'}
      />
      <Image
        source={LogoIcon}
        style={styles.backgroundImage}
        resizeMode="contain"
      />

      <Portal>
        <SignOutDialog
          visible={signOut}
          hideDialog={hideSignOutDialog}
          yes={handleSignOut}
        />
        <Credits visible={credits} hideDialog={hideCreditsDialog} />
      </Portal>

      <Animatable.View animation="fadeInUpBig" ref={_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileWrapper}>
            <View style={styles.profileContainer}>
              <Text style={styles.textName}>{currentUser.displayName}</Text>
              <Text style={styles.textEmail}>{currentUser.email}</Text>
            </View>
            <View style={styles.profileImageContainer}>
              <Image
                source={IconUser}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </View>
          </View>
          <ButtonWithIcon
            icon="github"
            title="Checkout the Project!"
            onPress={() => headToUrl(PROJECT_URL)}
          />
          <ButtonWithIcon
            icon="feather"
            title="Credits"
            onPress={showCreditsDialog}
          />
          <ButtonWithIcon
            icon="log-out"
            title="Sign Out"
            onPress={showSignOutDialog}
          />
        </ScrollView>
      </Animatable.View>
    </MyView>
  );
};

const ButtonWithIcon = ({icon, title, onPress}) => (
  <TouchableRipple borderless style={styles.button} onPress={onPress}>
    <View style={styles.card}>
      <Feather name={icon} size={40} color={PRIMARY_COLOR} />
      <Text style={styles.textButton}>{title}</Text>
    </View>
  </TouchableRipple>
);

const SignOutDialog = ({visible, hideDialog, yes}) => (
  <Dialog
    visible={visible}
    onDismiss={hideDialog}
    style={{marginHorizontal: 48}}
    theme={{roundness: 12}}>
    <Dialog.Title style={{color: PRIMARY_COLOR_DARK}}>
      Sign Out Confirmation
    </Dialog.Title>
    <Dialog.Content>
      <Text style={styles.textDialog}>Are you sure you want to Sign Out?</Text>
    </Dialog.Content>
    <Dialog.Actions style={{marginHorizontal: 8}}>
      <Button onPress={yes} labelStyle={{color: PRIMARY_COLOR, fontSize: 18}}>
        Yes
      </Button>
      <Button
        onPress={hideDialog}
        labelStyle={{color: PRIMARY_COLOR, fontSize: 18}}>
        No
      </Button>
    </Dialog.Actions>
  </Dialog>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: 256,
    height: 256,
    marginVertical: screenHeight / 2 - 128,
    position: 'absolute',
    alignSelf: 'center',
    tintColor: PRIMARY_COLOR,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 12,
    marginHorizontal: 24,
    marginVertical: 12,
    elevation: 12,
  },
  profileWrapper: {
    marginTop: StatusBar.currentHeight + 24,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  profileContainer: {
    backgroundColor: 'white',
    marginTop: 64,
    padding: 24,
    paddingTop: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },
  profileImageContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    borderRadius: 90,
    position: 'absolute',
    top: 0,
    elevation: 13,
    shadowColor: 'transparent',
  },
  profileImage: {
    borderRadius: 90,
    height: 116,
    width: 116,
  },
  textButton: {
    color: PRIMARY_COLOR_DARK,
    fontSize: 26,
    marginLeft: 12,
  },
  textDialog: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 18,
  },
  textName: {
    color: PRIMARY_COLOR_DARK,
    fontFamily: BOLD_TEXT,
    fontSize: 32,
    marginTop: 8,
    textAlign: 'center',
  },
  textEmail: {
    marginTop: 2,
    color: 'darkgrey',
    fontSize: 20,
    textAlign: 'center',
  },
});
