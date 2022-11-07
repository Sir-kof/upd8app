import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import backImg from '../assets/images/backImg.png';
import companyImg from '../assets/images/upd8.jpg';

const CursomDrawer = (props: JSX.IntrinsicAttributes) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.containerDrawer}>
        <ImageBackground source={backImg} style={styles.backImg}>
          <Image source={companyImg} style={styles.companyImg} />
          <Text style={styles.userName}>John Doe</Text>
        </ImageBackground>
        <View style={styles.viewDrawerList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDrawer: {
    backgroundColor: '#5271ff',
  },
  backImg: {
    padding: 20,
  },
  companyImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  viewDrawerList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});

export default CursomDrawer;
