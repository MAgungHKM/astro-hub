import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  Card,
  Text,
  Title,
  TextInput,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {FocusAwareStatusBar, MyView} from '../components';
import {LogoFull, LogoCredit} from '../assets';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');
const responsiveSize = width > height ? width * 0.4 : height * 0.4;

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [usernameColor, setUsernameColor] = useState(PRIMARY_COLOR);
  const [initialUsernameState, setInitialUsernameState] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordColor, setPasswordColor] = useState(PRIMARY_COLOR);
  const [initialPasswordState, setInitialPasswordState] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const _form = useRef(null);
  const _credit = useRef(null);
  const _footer = useRef(null);
  const _creditContainer = useRef(null);
  const _username = useRef(null);
  const _userCheck = useRef(null);
  const _password = useRef(null);
  const _eyeIcon = useRef(null);

  const updateSecureEntryText = () => setSecureTextEntry(!secureTextEntry);

  const handleUsernameChange = username => {
    setUsername(username);
    setInitialUsernameState(false);

    if (!isEmpty(username)) {
      setIsValidUsername(true);
      setUsernameColor('forestgreen');
    } else {
      setIsValidUsername(false);
      setUsernameColor('red');
    }

    _userCheck.current.bounceIn();
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

  const handleSignIn = () => console.log('Signing In');

  const handleSignUp = () => {
    _footer.current.fadeOutDownBig();
    _form.current.fadeOutUpBig().then(() => navigation.replace('SignUp'));
  };

  return (
    <MyView style={styles.container}>
      <FocusAwareStatusBar animated={true} hidden={false} />

      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"
        delay={200}
        ref={_form}>
        <Card theme={{roundness: 16}}>
          <Animatable.View animation="fadeIn" delay={1100}>
            <Card.Title
              title="Welcome to Astro Hub!"
              titleStyle={styles.cardTitle}
            />
          </Animatable.View>

          <Card.Content>
            <Animatable.View animation="fadeIn" delay={1300}>
              <TextInput
                label="Email"
                placeholder="Your Email"
                mode="outlined"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => _password.current.focus()}
                blurOnSubmit={false}
                theme={{
                  colors: {primary: usernameColor, placeholder: usernameColor},
                  roundness: 12,
                }}
                selectionColor={usernameColor}
                underlineColor={usernameColor}
                underlineColorAndroid={usernameColor}
                onChangeText={value => handleUsernameChange(value)}
                onEndEditing={event =>
                  handleUsernameChange(event.nativeEvent.text)
                }
                ref={_username}
                value={username}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Feather name="user" color={usernameColor} size={32} />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    name={() => (
                      <Animatable.View animation="bounceIn" ref={_userCheck}>
                        <Feather
                          name={
                            !initialUsernameState
                              ? isValidUsername
                                ? 'check-circle'
                                : 'x-circle'
                              : null
                          }
                          color={usernameColor}
                          size={32}
                        />
                      </Animatable.View>
                    )}
                  />
                }
              />
            </Animatable.View>

            {initialUsernameState ? null : isValidUsername ? null : (
              <Animatable.View
                animation="bounceIn"
                style={styles.errorContainer}>
                <Feather name="info" size={20} color="red" />
                <Caption style={styles.errorCaption}>
                  {isEmpty(username)
                    ? 'Email field is required.'
                    : 'Invalid Email or Password.'}
                </Caption>
              </Animatable.View>
            )}

            <Animatable.View
              animation="fadeIn"
              delay={1500}
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
                onSubmitEditing={() => handleSignIn(username, password)}
                selectionColor={passwordColor}
                underlineColor={passwordColor}
                underlineColorAndroid={passwordColor}
                onChangeText={value => handlePasswordChange(value)}
                onEndEditing={event =>
                  handlePasswordChange(event.nativeEvent.text)
                }
                ref={_password}
                value={password}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Feather name="lock" color={passwordColor} size={32} />
                    )}
                    access
                  />
                }
                right={
                  <TextInput.Icon
                    name={() => (
                      <Animatable.View
                        ref={_eyeIcon}
                        onTouchEnd={() => _eyeIcon.current.bounceIn()}>
                        <Feather
                          name={secureTextEntry ? 'eye-off' : 'eye'}
                          color={secureTextEntry ? 'darkgrey' : 'dimgrey'}
                          size={32}
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
              animation="fadeIn"
              delay={1700}>
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
              animation="fadeIn"
              delay={1900}
              style={{
                marginVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'darkgrey',
              }}
            />

            <Animatable.View
              style={[
                styles.buttonContainer,
                {
                  marginTop: 0,
                  backgroundColor: 'white',
                },
              ]}
              animation="fadeIn"
              delay={2100}>
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
    fontFamily: 'Atkinson-Hyperlegible-Regular',
    fontSize: 26,
  },
  cardTitle: {
    color: PRIMARY_COLOR_DARK,
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 24,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
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
});
