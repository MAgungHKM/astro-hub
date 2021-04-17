import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Keyboard, StyleSheet, View} from 'react-native';
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
import {AppContext} from '../contexts';
import {REGULAR_TEXT} from '../assets/static/fonts';

const {width, height} = Dimensions.get('window');
const responsiveSize = width > height ? width * 0.4 : height * 0.4;

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailColor, setEmailColor] = useState(PRIMARY_COLOR);
  const [initialEmailState, setInitialEmailState] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordColor, setPasswordColor] = useState(PRIMARY_COLOR);
  const [initialPasswordState, setInitialPasswordState] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const _form = useRef(null);
  const _credit = useRef(null);
  const _footer = useRef(null);
  const _creditContainer = useRef(null);
  const _email = useRef(null);
  const _emailCheck = useRef(null);
  const _password = useRef(null);
  const _eyeIcon = useRef(null);

  const updateSecureEntryText = () => setSecureTextEntry(!secureTextEntry);

  const handleEmailChange = email => {
    setEmail(email);
    setInitialEmailState(false);
    setBlocked(false);

    if (isEmpty(email)) {
      setIsValidEmail(false);
      setEmailColor('red');
    } else {
      setIsValidEmail(true);
      setEmailColor('forestgreen');
    }

    _emailCheck.current.bounceIn();
  };

  const handlePasswordChange = password => {
    setPassword(password);
    setInitialPasswordState(false);

    if (!isEmpty(password)) {
      setIsValidPassword(true);
      setPasswordColor('forestgreen');
    } else {
      setIsValidPassword(false);
      setPasswordColor('red');
    }
  };

  const handleInvalidInput = () => {
    setIsValidEmail(false);
    setEmailColor('red');
    setPassword('');
    setPasswordColor('red');
    setIsValidPassword(false);
    _email.current.focus();
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    _email.current.blur();
    _password.current.blur();
    setInitialEmailState(false);
    setInitialPasswordState(false);
    startLoading();

    if (isValidEmail && isValidPassword) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          stopLoading();
          navigation.replace('Home');
        })
        .catch(error => {
          stopLoading();
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            handleInvalidInput();
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            handleInvalidInput();
          }

          if (error.code === 'auth/user-not-found') {
            console.log('That user not found!');
            handleInvalidInput();
          }

          if (error.code === 'auth/wrong-password') {
            console.log('Wrong password!');
            handleInvalidInput();
          }

          if (error.code === 'auth/too-many-requests') {
            console.log('Your account is temporarily blocked!');
            setBlocked(true);
            handleInvalidInput();
          }
        });
    } else {
      stopLoading();
      if (isEmpty(email)) {
        setIsValidEmail(false);
        setEmailColor('red');
      }
      if (isEmpty(password)) {
        setIsValidPassword(false);
        setPasswordColor('red');
      }
      _email.current.focus();
    }
  };

  const handleSignUp = () => {
    _footer.current.fadeOutDownBig();
    _form.current.fadeOutUpBig().then(() => navigation.replace('SignUp'));
  };

  return (
    <MyView style={styles.container}>
      <FocusAwareStatusBar animated={true} hidden={false} />
      <LoadingIndicator isLoading={isLoading} />

      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"
        delay={200}
        ref={_form}>
        <Card theme={{roundness: 16}} style={styles.card}>
          <Animatable.View animation="bounceIn" delay={1100}>
            <Card.Title
              title="Welcome to Astro Hub!"
              titleStyle={styles.cardTitle}
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
                onSubmitEditing={() => _password.current.focus()}
                blurOnSubmit={false}
                theme={{
                  colors: {primary: emailColor, placeholder: emailColor},
                  roundness: 12,
                }}
                selectionColor={emailColor}
                underlineColor={emailColor}
                underlineColorAndroid={emailColor}
                onChangeText={value => handleEmailChange(value)}
                onEndEditing={e => handleEmailChange(e.nativeEvent.text)}
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
                    : blocked
                    ? 'Your account has been temporarily blocked.'
                    : 'Invalid Email Address or Password.'}
                </Caption>
              </Animatable.View>
            )}

            <Animatable.View
              animation="bounceIn"
              delay={1300}
              style={{marginTop: 12}}>
              <TextInput
                label="Password"
                placeholder="Your Password"
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                theme={{
                  colors: {primary: passwordColor, placeholder: passwordColor},
                  roundness: 12,
                }}
                returnKeyType="go"
                onSubmitEditing={() => handleSignIn(email, password)}
                selectionColor={passwordColor}
                underlineColor={passwordColor}
                underlineColorAndroid={passwordColor}
                onChangeText={value => handlePasswordChange(value)}
                ref={_password}
                value={password}
                left={
                  <TextInput.Icon
                    name={({size}) => (
                      <Feather name="lock" color={passwordColor} size={size} />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    name={({size}) => (
                      <Animatable.View
                        ref={_eyeIcon}
                        onTouchEnd={() => _eyeIcon.current.bounceIn()}>
                        <Feather
                          name={secureTextEntry ? 'eye-off' : 'eye'}
                          color={secureTextEntry ? 'darkgrey' : 'dimgrey'}
                          size={size}
                        />
                      </Animatable.View>
                    )}
                    onPress={updateSecureEntryText}
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
                    : 'Invalid Password.'}
                </Caption>
              </Animatable.View>
            )}

            <Animatable.View
              style={styles.buttonContainer}
              animation="bounceIn"
              delay={1400}>
              <TouchableRipple
                style={styles.button}
                borderless={true}
                onPress={handleSignIn}>
                <Title style={[styles.cardTitle, {color: 'white'}]}>
                  Sign In
                </Title>
              </TouchableRipple>
            </Animatable.View>

            <Animatable.View
              animation="bounceIn"
              delay={1500}
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
              delay={1500}>
              <TouchableRipple
                style={styles.button}
                borderless={true}
                onPress={handleSignUp}>
                <Title style={[styles.cardTitle, {color: PRIMARY_COLOR}]}>
                  Sign Up
                </Title>
              </TouchableRipple>
            </Animatable.View>
          </Card.Content>
        </Card>
      </Animatable.View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUp"
        delay={300}
        onAnimationEnd={() => _creditContainer.current.fadeIn()}
        ref={_footer}>
        <Title style={styles.title}>{'D E V E L O P E D   B Y'}</Title>

        <Animatable.View animation="fadeOutDownBig" ref={_creditContainer}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            iterationDelay={2000}
            style={styles.credit}
            source={LogoCredit}
            resizeMode="contain"
            ref={_credit}
          />
        </Animatable.View>
      </Animatable.View>
    </MyView>
  );
};

const isEmpty = check => check.trim().length === 0;

export default SignInScreen;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: REGULAR_TEXT,
    fontSize: 26,
    textAlign: 'center',
  },
  cardTitle: {
    color: PRIMARY_COLOR_DARK,
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    padding: 24,
    marginTop: 36,
    marginBottom: 80,
  },
  footer: {
    alignSelf: 'center',
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
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  line: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
  },
});
