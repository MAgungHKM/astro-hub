import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';

const ListNews = ({navigation, data}) =>
  data.length > 0
    ? data.map((item, index) => (
        <TouchableRipple
          borderless
          key={index}
          onPress={() => navigation.push('Detail', {data: item})}
          style={styles.itemContainer}>
          <ImageBackground
            style={styles.item}
            imageStyle={styles.image}
            resizeMode="cover"
            source={{uri: item.imageUrl}}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableRipple>
      ))
    : null;

export default ListNews;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 240,
  },
  itemContainer: {
    marginVertical: 12,
    marginHorizontal: 24,
    elevation: 12,
    borderRadius: 16,
  },
  image: {
    borderRadius: 16,
  },
  titleContainer: {
    marginBottom: 0,
    marginTop: 'auto',
    borderRadius: 16,
    backgroundColor: '#2F2F2F8F',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  title: {
    color: 'white',
    textAlign: 'justify',
    fontSize: 18,
    fontFamily: 'Atkinson-Hyperlegible-Bold',
  },
});
