import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {FocusAwareStatusBar, LoadingIndicator, MyView} from '../../components';
import {Title, Button, Text, TouchableRipple} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Header} from '../../assets';
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
  useCollapsibleStyle,
  useFocusedTab,
} from 'react-native-collapsible-tab-view';
import * as Animatable from 'react-native-animatable';
import {PRIMARY_COLOR, PRIMARY_COLOR_DARK} from '../../assets/static/colors';
import Animated from 'react-native-reanimated';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from './TabBar';
import ArticleScreen from './ArticleScreen';
import BlogScreen from './BlogScreen';
import ReportScreen from './ReportScreen';
import {
  fetchArticle,
  fetchBlog,
  fetchPlanetOrMoon,
  fetchReport,
} from '../../api/ApiService';
import {
  HomeContext,
  HomeProvider,
  AuthContext,
  NavContext,
} from '../../contexts';
import {useIsFocused} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const HEADER_HEIGHT = 235;
const LIMIT = 50;

const HomeScreen = ({navigation}) => (
  <HomeProvider>
    <Home navigation={navigation} />
  </HomeProvider>
);

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const Home = ({navigation}) => {
  const {currentUser} = useContext(AuthContext);
  const {
    articlesSize,
    blogsSize,
    reportsSize,
    setArticles,
    setBlogs,
    setReports,
    setArticlesSize,
    setBlogsSize,
    setReportsSize,
    pushArticles,
    pushBlogs,
    pushReports,
    focusedTab,
  } = useContext(HomeContext);

  const {navTarget} = useContext(NavContext);

  const isFocused = useIsFocused();

  const _container = useRef(null);

  const [statusBar, setStatusBar] = useState(false);
  const [scroll, setScroll] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);
  const [planetOrMoon, setPlanetOrMoon] = useState({});
  const [initialization, setInitialization] = useState(true);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const onScroll = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      switch (focusedTab) {
        case 'Article':
          if (articlesSize < LIMIT) {
            startLoading();
            setArticlesSize(articlesSize + 5);
            setTimeout(() => {
              stopLoading();
            }, 300);
          }
          break;

        case 'Blog':
          if (blogsSize < LIMIT) {
            startLoading();
            setBlogsSize(blogsSize + 5);
            setTimeout(() => {
              stopLoading();
            }, 300);
          }
          break;

        case 'Report':
          if (reportsSize < LIMIT) {
            startLoading();
            setReportsSize(reportsSize + 5);
            setTimeout(() => {
              stopLoading();
            }, 300);
          }
          break;

        default:
          break;
      }
    }

    let y = nativeEvent.contentOffset.y;
    setScroll(y);
    let scrollValue = y;
    if (scrollValue > HEADER_HEIGHT - 64 && !statusBar) {
      setStatusBar(true);
    }
    if (scrollValue <= HEADER_HEIGHT - 64 && statusBar) {
      setStatusBar(false);
    }
  };

  const handleRefresh = () => {
    startLoading();
    setArticlesSize(5);
    setBlogsSize(5);
    setReportsSize(5);

    fetchArticle().then(response => {
      setArticles(response.data);
      setInitialization(false);
      stopLoading();
    });

    fetchBlog().then(response => {
      setBlogs(response.data);
      setInitialization(false);
      stopLoading();
    });

    fetchReport().then(response => {
      setReports(response.data);
      setInitialization(false);
      stopLoading();
    });
  };

  useEffect(() => {
    handleRefresh();

    fetchPlanetOrMoon().then(response => {
      setPlanetOrMoon(response.data.bodies[0]);
    });
  }, []);

  useEffect(() => {
    if (navTarget !== 'Home') _container.current.fadeOutDownBig(500);
    else if (!initialization)
      setTimeout(() => {
        _container.current.fadeInUpBig();
      }, 850);
  }, [navTarget]);

  return (
    <MyView style={{flex: 1}}>
      <LoadingIndicator isLoading={isLoading} />
      <FocusAwareStatusBar
        translucent
        animated={true}
        backgroundColor={statusBar ? PRIMARY_COLOR_DARK : 'transparent'}
      />
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.container}
        ref={_container}>
        <ScrollView
          style={[styles.container, {marginTop: 48 - StatusBar.currentHeight}]}
          onScroll={onScroll}
          refreshControl={
            <RefreshControl
              colors={[PRIMARY_COLOR]}
              accessibilityIgnoresInvertColors={true}
              progressViewOffset={128}
              tintColor={'transparent'}
              titleColor={'transparent'}
              refreshing={isLoading}
              onRefresh={handleRefresh}
            />
          }>
          <ImageBackground
            source={Header}
            style={{
              flex: 1,
              height: HEADER_HEIGHT,
              backgroundColor: 'white',
            }}
            resizeMode="cover">
            <Title
              numberOfLines={2}
              style={[styles.title, {marginTop: StatusBar.currentHeight + 28}]}>
              {greeting()},{' '}
              {currentUser
                ? currentUser.displayName
                  ? currentUser.displayName
                  : 'loading...'
                : 'loading...'}
              !
            </Title>
            <Text style={[styles.title, {marginTop: 16, fontSize: 20}]}>
              Here's today's {!planetOrMoon.isPlanet ? 'Moon' : 'Planet'}
            </Text>
            <Title
              style={[
                styles.title,
                {marginTop: 0, fontSize: 22, width: '55%'},
              ]}>
              {!planetOrMoon.name
                ? 'Fetching Data'
                : planetOrMoon.englishName === ''
                ? planetOrMoon.name
                : planetOrMoon.englishName}
            </Title>
          </ImageBackground>
          <Tab.Navigator
            lazy
            lazyPlaceholder={() => (
              <View style={{flex: 1, backgroundColor: 'white'}} />
            )}
            style={{flex: 1}}
            tabBar={TabBar}
            backBehavior="none">
            <Tab.Screen name="Article" component={ArticleScreen} />
            <Tab.Screen name="Blog" component={BlogScreen} />
            <Tab.Screen name="Report" component={ReportScreen} />
          </Tab.Navigator>
        </ScrollView>
      </Animatable.View>
    </MyView>
  );
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
  title: {
    marginTop: 8,
    marginHorizontal: 24,
    color: 'white',
    fontSize: 24,
  },
});
