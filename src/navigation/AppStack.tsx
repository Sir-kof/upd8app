import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CustomDrawer from '../components/CustomDrawer';

import RegisterUserScreen from '../screens/RegisterUserScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ResponseScreen from '../screens/ResponseScreen';
import UserScreen from '../screens/UserScreen';

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: JSX.IntrinsicAttributes) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#5271ff',
        drawerActiveTintColor: '#ddd',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: styles.drawerNav,
      }}>
      <Drawer.Screen
        component={HomeScreen}
        name="Home"
        options={{
          drawerIcon: ({color}: any) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={RegisterUserScreen}
        name="Cadastrar"
        options={{
          drawerIcon: ({color}: any) => (
            <Ionicons name="person-add-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        component={SearchScreen}
        name="Consultar"
        options={{
          drawerIcon: ({color}: any) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        component={ResponseScreen}
        name="Response"
        options={{
          drawerItemStyle: {height: 0},
          drawerIcon: ({color}: any) => (
            <FontAwesome5 name="address-card" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        component={UserScreen}
        name="User"
        options={{
          drawerItemStyle: {height: 0},
          drawerIcon: ({color}: any) => (
            <FontAwesome5 name="address-card" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerNav: {
    marginLeft: -25,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
});

export default AuthStack;
