import React, {useContext} from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {FocusAwareStatusBar, MyView} from '../../components';
import {Title, Button} from 'react-native-paper';
import {AppContext} from '../../contexts/AppContext';
import auth from '@react-native-firebase/auth';
import {Header} from '../../assets';
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from 'react-native-collapsible-tab-view';
import * as Animatable from 'react-native-animatable';
import {PRIMARY_COLOR} from '../../assets/static/colors';

const HEADER_HEIGHT = 235;

const TabHeader = () => {
  return (
    <Animatable.View
      animation="fadeIn"
      style={[styles.container, {marginTop: -StatusBar.currentHeight}]}>
      <ImageBackground
        source={Header}
        style={{
          flex: 1,
          height: HEADER_HEIGHT,
          marginBottom: StatusBar.currentHeight,
        }}
        resizeMode="cover">
        <Title style={styles.greeting}>{greeting()}</Title>
      </ImageBackground>
    </Animatable.View>
  );
};

const TabBar = props => (
  <MaterialTabBar
    {...props}
    activeColor="black"
    inactiveColor="black"
    inactiveOpacity={1}
    TabItemComponent={props => (
      <MaterialTabItem
        {...props}
        activeColor="black"
        inactiveColor="black"
        inactiveOpacity={1}
        style={{
          borderRadius: 8,
          backgroundColor: PRIMARY_COLOR,
          margin: 12,
        }}
        labelStyle={{
          color: 'white',
          fontFamily: 'Atkinson-Hyperlegible-Bold',
          fontSize: 20,
        }}
      />
    )}
  />
);

const HomeScreen = ({navigation}) => {
  const {currentUser} = useContext(AppContext);
  const renderItem: ListRenderItem<number> = React.useCallback(({index}) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <MyView style={{flex: 1}}>
      <FocusAwareStatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        <Tabs.Container
          TabBarComponent={TabBar}
          HeaderComponent={TabHeader}
          headerHeight={HEADER_HEIGHT}
          snapThreshold={0.3}>
          <Tabs.Tab name="Article" label="Article">
            <Tabs.FlatList
              data={[0, 1, 2, 3, 4]}
              renderItem={renderItem}
              keyExtractor={v => v + ''}
            />
          </Tabs.Tab>
          <Tabs.Tab name="Blog" label="Blog">
            <Tabs.ScrollView>
              <View style={[styles.box, styles.boxA]} />
              <View style={[styles.box, styles.boxB]} />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="Report" label="Report">
            <Tabs.ScrollView>
              <View style={[styles.box, styles.boxA]} />
              <View style={[styles.box, styles.boxB]} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </MyView>
  );
  // return (
  //   <MyView style={styles.container}>
  //     {/* <Title style={{color: 'white'}}>
  //       {currentUser.displayName ? `Hello, ${currentUser.displayName}!` : null}
  //     </Title>
  //     <Button
  //       style={{backgroundColor: 'white', marginTop: 12}}
  //       onPress={() => {
  //         navigation.replace('SignIn');
  //         auth()
  //           .signOut()
  //           .then(res => {
  //             console.log(JSON.stringify(res, null, 5));
  //           })
  //           .catch(error => {
  //             console.log(JSON.stringify(error, null, 5));
  //           });
  //       }}>
  //       Sign Out
  //     </Button> */}
  //     <FocusAwareStatusBar translucent backgroundColor="transparent" />
  //     <Animatable.View animation="fadeIn" style={styles.container}>
  //       <ImageBackground
  //         source={Header}
  //         style={{flex: 1, height: 300, backgroundColor: 'white'}}
  //         resizeMode="cover">
  //         <Title style={styles.greeting}>{greeting()}</Title>
  //       </ImageBackground>
  //     </Animatable.View>
  //   </MyView>
  // );
};

const greeting = () => {
  const ndate = new Date();
  const hr = ndate.getHours();
  if (hr < 12) return 'Good Morning';
  else if (hr >= 12 && hr <= 17) return 'Good Afternoon';
  else if (hr >= 17 && hr <= 24) return 'Good Evening';
};

export default HomeScreen;

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: StatusBar.currentHeight + 28,
    marginHorizontal: 24,
    color: 'white',
    fontSize: 26,
  },
});
