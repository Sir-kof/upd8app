import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import ResponseScreen from '../screens/ResponseScreen';

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={RegisterUserScreen} name="Cadastrar" />
      <Stack.Screen component={SearchScreen} name="Consultar" />
      <Stack.Screen component={ResponseScreen} name="Response" />
    </Stack.Navigator>
  );
};

export default AuthStack;
