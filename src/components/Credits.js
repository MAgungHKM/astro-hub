import React from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {
  Dialog,
  Subheading,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {PRIMARY_COLOR_DARK} from '../assets/static/colors';
import {
  ZAHID,
  ZAHID_URL,
  CATALY,
  CATALY_URL,
  HILMY,
  HILMY_URL,
  ZAKKY,
  ZAKKY_URL,
  PRADIP,
  PRADIP_URL,
  PRAWIT,
  PRAWIT_URL,
  FEATHER,
  FEATHER_URL,
  NAVIG,
  NAVIG_URL,
  FIREB,
  FIREB_URL,
  PAPER,
  PAPER_URL,
  ANIMA,
  ANIMA_URL,
  VECTOR,
  VECTOR_URL,
} from '../assets/static/strings';

const headToUrl = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

const Credits = ({visible, hideDialog}) => (
  <Dialog
    visible={visible}
    onDismiss={hideDialog}
    style={{marginHorizontal: 48}}
    theme={{roundness: 12}}>
    <View style={styles.cardHeader}>
      <Title style={{color: PRIMARY_COLOR_DARK}}>Credits</Title>
      <TouchableRipple
        borderless
        onPress={hideDialog}
        style={{borderRadius: 8}}>
        <Feather name="x" size={32} />
      </TouchableRipple>
    </View>
    <Dialog.ScrollArea>
      <ScrollView style={{marginVertical: 24}}>
        <Subheading style={styles.subHeading}>Mentor / Teacher</Subheading>
        <TouchableItemWithUrl name={ZAHID} url={ZAHID_URL} />
        <TouchableItemWithUrl name={PRADIP} url={PRADIP_URL} />
        <TouchableItemWithUrl name={PRAWIT} url={PRAWIT_URL} />
        <TouchableItemWithUrl name={HILMY} url={HILMY_URL} />
        <TouchableItemWithUrl name={ZAKKY} url={ZAKKY_URL} />

        <Subheading style={[styles.subHeading, {marginTop: 16}]}>
          Artists
        </Subheading>
        <TouchableItemWithUrl name={CATALY} url={CATALY_URL} />
        <TouchableItemWithUrl name={FEATHER} url={FEATHER_URL} />
        <TouchableItemWithUrl name="M Agung Hikmatullah" />

        <Subheading style={[styles.subHeading, {marginTop: 16}]}>
          Libraries
        </Subheading>
        <TouchableItemWithUrl name={NAVIG} url={NAVIG_URL} />
        <TouchableItemWithUrl name={FIREB} url={FIREB_URL} />
        <TouchableItemWithUrl name={PAPER} url={PAPER_URL} />
        <TouchableItemWithUrl name={ANIMA} url={ANIMA_URL} />
        <TouchableItemWithUrl name={VECTOR} url={VECTOR_URL} />
      </ScrollView>
    </Dialog.ScrollArea>
  </Dialog>
);

const TouchableItemWithUrl = ({name, url = null}) => (
  <TouchableRipple
    borderless
    style={styles.touchableItemContainer}
    onPress={() => (url ? headToUrl(url) : null)}>
    <Text style={styles.touchableItemText}>{name}</Text>
  </TouchableRipple>
);

export default Credits;

const styles = StyleSheet.create({
  subHeading: {
    textAlign: 'center',
    fontSize: 24,
  },
  touchableItemContainer: {
    borderRadius: 8,
    width: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableItemText: {
    fontSize: 18,
    color: PRIMARY_COLOR_DARK,
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
