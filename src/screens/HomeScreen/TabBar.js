import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TouchableRipple, Text} from 'react-native-paper';
import {PRIMARY_COLOR} from '../../assets/static/colors';
import {BOLD_TEXT} from '../../assets/static/fonts';

const TabBar = ({state, descriptors, navigation, position}) => {
  const tabs = [];

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Animatable.View
            animation="bounceIn"
            key={index}
            style={{flex: 1}}
            ref={ref => (tabs[index] = ref)}
            onTouchEnd={() => tabs[index].swing()}>
            <TouchableRipple
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: isFocused ? PRIMARY_COLOR : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.itemText,
                  {color: isFocused ? 'white' : PRIMARY_COLOR},
                ]}>
                {label}
              </Text>
            </TouchableRipple>
          </Animatable.View>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 12,
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  itemText: {
    fontSize: 20,
    fontFamily: BOLD_TEXT,
    opacity: 1,
  },
});
