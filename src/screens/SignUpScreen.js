import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Card,
  Text,
  Title,
  TextInput,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {FocusAwareStatusBar, LoadingIndicator, MyView} from '../components';
import {LogoFull, LogoCredit} from '../assets';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {emailValidation, randomString} from '../utils/helpers';

const {width, height} = Dimensions.get('window');
const responsiveSize = width > height ? width * 0.4 : height * 0.4;

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailColor, setEmailColor] = useState(PRIMARY_COLOR);
  const [initialEmailState, setInitialEmailState] = useState(true);
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [nameColor, setNameColor] = useState(PRIMARY_COLOR);
  const [initialNameState, setInitialNameState] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordColor, setPasswordColor] = useState(PRIMARY_COLOR);
  const [initialPasswordState, setInitialPasswordState] = useState(true);
  const [passwordSecret, setPasswordSecret] = useState(true);
  const [confirm, setConfirm] = useState('');
  const [isValidConfirm, setIsValidConfirm] = useState(false);
  const [confirmColor, setConfirmColor] = useState(PRIMARY_COLOR);
  const [initialConfirmState, setInitialConfirmState] = useState(true);
  const [confirmSecret, setConfirmSecret] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const _form = useRef(null);
  const _email = useRef(null);
  const _emailCheck = useRef(null);
  const _name = useRef(null);
  const _nameCheck = useRef(null);
  const _password = useRef(null);
  const _confirm = useRef(null);
  const _eyePassword = useRef(null);
  const _eyeConfirm = useRef(null);

  const updatePasswordSecret = () => setPasswordSecret(!passwordSecret);
  const updateConfirmSecret = () => setConfirmSecret(!confirmSecret);

  const handleEmailChange = email => {
    setEmail(email);
    setInitialEmailState(false);

    if (isEmpty(email) || emailValidation.test(email) === false) {
      setIsValidEmail(false);
      setEmailColor('red');
    } else {
      setIsValidEmail(true);
      setEmailColor('forestgreen');
    }

    _emailCheck.current.bounceIn();
  };

  const handleNameChange = name => {
    setName(name);
    setInitialNameState(false);

    if (!isEmpty(name) && name.length <= 12) {
      setIsValidName(true);
      setNameColor('forestgreen');
    } else {
      setIsValidName(false);
      setNameColor('red');
    }

    _nameCheck.current.bounceIn();
  };

  const handlePasswordChange = password => {
    setPassword(password);
    setInitialPasswordState(false);

    if (!isEmpty(password) && password.length >= 6) {
      setIsValidPassword(true);
      setPasswordColor('forestgreen');
    } else {
      setIsValidPassword(false);
      setPasswordColor('red');
    }
  };

  const handleConfirmChange = confirm => {
    setConfirm(confirm);
    setInitialConfirmState(false);

    if (isEmpty(confirm) || confirm !== password) {
      setIsValidConfirm(false);
      setConfirmColor('red');
    } else {
      setIsValidConfirm(true);
      setConfirmColor('forestgreen');
    }
  };

  const handleSignUp = () => {
    startLoading();
    Keyboard.dismiss();
    _email.current.blur();
    _name.current.blur();
    _password.current.blur();
    _confirm.current.blur();
    setInitialEmailState(false);
    setInitialNameState(false);
    setInitialPasswordState(false);
    setInitialConfirmState(false);

    if (isValidEmail && isValidName && isValidPassword && isValidConfirm) {
      database()
        .ref('/users')
        .once('value', snapshots => {
          let check = false;
          const results = JSON.parse(JSON.stringify(snapshots));
          for (const result in results) {
            if (Object.hasOwnProperty.call(results, result)) {
              const res = results[result];
              if (res.displayName === name) {
                check = true;
                break;
              }
            }
          }

          if (check) {
            console.log('That Display Name address is already in use!');
            setIsValidName(false);
            setNameColor('red');
            _name.current.focus();
          } else {
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(res => {
                auth()
                  .currentUser.updateProfile({displayName: name})
                  .then(async () => {
                    const newRef = database().ref(`/users/`).push();
                    await newRef
                      .set({
                        uid: `${randomString()}${
                          auth().currentUser.uid
                        }${randomString()}`,
                        displayName: auth().currentUser.displayName,
                      })
                      .then(() => {
                        auth()
                          .signOut()
                          .then(() =>
                            auth()
                              .signInWithEmailAndPassword(email, password)
                              .then(() => {
                                stopLoading();
                                navigation.replace('Home');
                              }),
                          );
                      });
                  });
              })
              .catch(error => {
                stopLoading();
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                  setIsValidEmail(false);
                  setEmailColor('red');
                  _email.current.focus();
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                  setIsValidEmail(false);
                  setEmailColor('red');
                  _email.current.focus();
                }
              });
          }
        })
        .finally(() => stopLoading());
    } else {
      stopLoading();
      if (isEmpty(email)) {
        setIsValidEmail(false);
        setEmailColor('red');
      }
      if (isEmpty(name)) {
        setIsValidName(false);
        setNameColor('red');
      }
      if (isEmpty(password)) {
        setIsValidPassword(false);
        setPasswordColor('red');
      }
      if (isEmpty(confirm)) {
        setIsValidConfirm(false);
        setConfirmColor('red');
      }
      _email.current.focus();
    }
  };

  const handleSignIn = () =>
    _form.current.fadeOutUpBig().then(() => navigation.replace('SignIn'));

  return (
    <MyView style={styles.container}>
      <FocusAwareStatusBar animated={true} hidden={false} />
      <LoadingIndicator isLoading={isLoading} />

      <Animatable.View
        style={styles.content}
        animation="fadeInDownBig"
        delay={200}
        ref={_form}>
        <Card theme={{roundness: 16}}>
          <ScrollView contentContainerStyle={{paddingBottom: 16}}>
            <Animatable.View animation="bounceIn" delay={1100}>
              <Card.Title
                title="Please fill the form!"
                titleStyle={styles.title}
              />
            </Animatable.View>

            <Card.Content>
              <Animatable.View animation="bounceIn" delay={1200}>
                <TextInput
                  label="Email Address"
                  placeholder="Your Email Address"
                  mode="outlined"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => _name.current.focus()}
                  blurOnSubmit={false}
                  theme={{
                    colors: {primary: emailColor, placeholder: emailColor},
                    roundness: 12,
                  }}
                  selectionColor={emailColor}
                  underlineColor={emailColor}
                  underlineColorAndroid={emailColor}
                  onChangeText={value => handleEmailChange(value)}
                  ref={_email}
                  value={email}
                  left={
                    <TextInput.Icon
                      name={({size}) => (
                        <Feather name="mail" color={emailColor} size={size} />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      name={({size}) => (
                        <Animatable.View animation="bounceIn" ref={_emailCheck}>
                          <Feather
                            name={
                              !initialEmailState
                                ? isValidEmail
                                  ? 'check-circle'
                                  : 'x-circle'
                                : null
                            }
                            color={emailColor}
                            size={size}
                          />
                        </Animatable.View>
                      )}
                    />
                  }
                />
              </Animatable.View>

              {initialEmailState ? null : isValidEmail ? null : (
                <Animatable.View
                  animation="bounceIn"
                  style={styles.errorContainer}>
                  <Feather name="info" size={20} color="red" />
                  <Caption style={styles.errorCaption}>
                    {isEmpty(email)
                      ? 'Email Address field is required.'
                      : emailValidation.test(email) === false
                      ? 'Invalid email address format'
                      : 'Email Address is already used.'}
                  </Caption>
                </Animatable.View>
              )}

              <Animatable.View
                animation="bounceIn"
                delay={1300}
                style={{marginTop: 12}}>
                <TextInput
                  label="Display Name"
                  placeholder="Your Display Name"
                  mode="outlined"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => _password.current.focus()}
                  blurOnSubmit={false}
                  theme={{
                    colors: {primary: nameColor, placeholder: nameColor},
                    roundness: 12,
                  }}
                  selectionColor={nameColor}
                  underlineColor={nameColor}
                  underlineColorAndroid={nameColor}
                  onChangeText={value => handleNameChange(value)}
                  ref={_name}
                  value={name}
                  left={
                    <TextInput.Icon
                      name={({size}) => (
                        <Feather name="user" color={nameColor} size={size} />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      name={({size}) => (
                        <Animatable.View animation="bounceIn" ref={_nameCheck}>
                          <Feather
                            name={
                              !initialNameState
                                ? isValidName
                                  ? 'check-circle'
                                  : 'x-circle'
                                : null
                            }
                            color={nameColor}
                            size={size}
                          />
                        </Animatable.View>
                      )}
                    />
                  }
                />
              </Animatable.View>

              {initialNameState ? null : isValidName ? null : (
                <Animatable.View
                  animation="bounceIn"
                  style={styles.errorContainer}>
                  <Feather name="info" size={20} color="red" />
                  <Caption style={styles.errorCaption}>
                    {isEmpty(name)
                      ? 'Display Name field is required.'
                      : name.length > 12
                      ? 'Maximum display name length is 12'
                      : 'Display Name is already used.'}
                  </Caption>
                </Animatable.View>
              )}

              <Animatable.View
                animation="bounceIn"
                delay={1400}
                style={{marginTop: 12}}>
                <TextInput
                  label="Password"
                  placeholder="Your Password"
                  mode="outlined"
                  autoCapitalize="none"
                  secureTextEntry={passwordSecret}
                  theme={{
                    colors: {
                      primary: passwordColor,
                      placeholder: passwordColor,
                    },
                    roundness: 12,
                  }}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => _confirm.current.focus()}
                  selectionColor={passwordColor}
                  underlineColor={passwordColor}
                  underlineColorAndroid={passwordColor}
                  onChangeText={value => handlePasswordChange(value)}
                  ref={_password}
                  value={password}
                  left={
                    <TextInput.Icon
                      name={({size}) => (
                        <Feather
                          name="lock"
                          color={passwordColor}
                          size={size}
                        />
                      )}
                      access
                    />
                  }
                  right={
                    <TextInput.Icon
                      name={({size}) => (
                        <Animatable.View
                          ref={_eyeConfirm}
                          onTouchEnd={() => _eyeConfirm.current.bounceIn()}>
                          <Feather
                            name={passwordSecret ? 'eye-off' : 'eye'}
                            color={passwordSecret ? 'darkgrey' : 'dimgrey'}
                            size={size}
                          />
                        </Animatable.View>
                      )}
                      onPress={updatePasswordSecret}
                    />
                  }
                />
              </Animatable.View>

              {initialPasswordState ? null : isValidPassword ? null : (
                <Animatable.View
                  animation="bounceIn"
                  style={styles.errorContainer}>
                  <Feather name="info" size={22} color="red" />
                  <Caption style={styles.errorCaption}>
                    {isEmpty(password)
                      ? 'Password field is required.'
                      : password.length < 6
                      ? 'Minimum password length is 6'
                      : 'Invalid Password.'}
                  </Caption>
                </Animatable.View>
              )}

              <Animatable.View
                animation="bounceIn"
                delay={1500}
                style={{marginTop: 12}}>
                <TextInput
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  mode="outlined"
                  autoCapitalize="none"
                  secureTextEntry={confirmSecret}
                  theme={{
                    colors: {primary: confirmColor, placeholder: confirmColor},
                    roundness: 12,
                  }}
                  returnKeyType="go"
                  onSubmitEditing={handleSignUp}
                  selectionColor={confirmColor}
                  underlineColor={confirmColor}
                  underlineColorAndroid={confirmColor}
                  onChangeText={value => handleConfirmChange(value)}
                  ref={_confirm}
                  value={confirm}
                  left={
                    <TextInput.Icon
                      name={({size}) => (
                        <Feather name="lock" color={confirmColor} size={size} />
                      )}
                      access
                    />
                  }
                  right={
                    <TextInput.Icon
                      name={({size}) => (
                        <Animatable.View
                          ref={_eyePassword}
                          onTouchEnd={() => _eyePassword.current.bounceIn()}>
                          <Feather
                            name={confirmSecret ? 'eye-off' : 'eye'}
                            color={confirmSecret ? 'darkgrey' : 'dimgrey'}
                            size={size}
                          />
                        </Animatable.View>
                      )}
                      onPress={updateConfirmSecret}
                    />
                  }
                />
              </Animatable.View>

              {initialConfirmState ? null : isValidConfirm ? null : (
                <Animatable.View
                  animation="bounceIn"
                  style={styles.errorContainer}>
                  <Feather name="info" size={22} color="red" />
                  <Caption style={styles.errorCaption}>
                    {isEmpty(confirm)
                      ? 'Confirm Password field is required.'
                      : 'Password is not the same.'}
                  </Caption>
                </Animatable.View>
              )}

              <Animatable.View
                style={styles.buttonContainer}
                animation="bounceIn"
                delay={1600}>
                <TouchableRipple
                  style={styles.button}
                  borderless={true}
                  onPress={handleSignUp}>
                  <Title style={[styles.title, {color: 'white'}]}>
                    Sign Up
                  </Title>
                </TouchableRipple>
              </Animatable.View>

              <Animatable.View
                animation="bounceIn"
                delay={1700}
                style={styles.line}
              />

              <Animatable.View
                style={[
                  styles.buttonContainer,
                  {
                    marginTop: 0,
                    backgroundColor: 'white',
                  },
                ]}
                animation="bounceIn"
                delay={1700}>
                <TouchableRipple
                  style={styles.button}
                  borderless={true}
                  onPress={handleSignIn}>
                  <Title style={[styles.title, {color: PRIMARY_COLOR}]}>
                    Sign In
                  </Title>
                </TouchableRipple>
              </Animatable.View>
            </Card.Content>
          </ScrollView>
        </Card>
      </Animatable.View>
    </MyView>
  );
};

const isEmpty = check => check.trim().length === 0;

export default SignUpScreen;

const styles = StyleSheet.create({
  title: {
    color: PRIMARY_COLOR_DARK,
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: responsiveSize,
    height: responsiveSize,
  },
  credit: {
    marginTop: 12,
    width: responsiveSize,
    height: 50,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorCaption: {
    marginLeft: 4,
    fontSize: 14,
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
    marginTop: 24,
    height: 56,
    borderRadius: 12,
  },
  button: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
  },
});
