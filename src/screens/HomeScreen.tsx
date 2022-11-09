import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import env from '../config/env';

import companyImg from '../assets/images/upd8.jpg';

export default function HomeScreen({navigation}: any) {
  // let url = `${env.baseUrl}:${env.port}/api/user/12345678900`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(function (error) {
  //     console.log('A um problema aqui: ' + error.message);
  //     throw error;
  //   });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{marginTop: 30}}>
            <Image source={companyImg} style={styles.userImg} />
          </View>
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 10}}>
            Bem vindo a UPD8
          </Text>
          <View style={{marginTop: 20}}>
            <CustomButton
              label={'Cadastrar Usuários'}
              onPress={() => navigation.navigate('Cadastrar')}
            />
            <CustomButton
              label={'Consultar cadastros'}
              onPress={() => navigation.navigate('Consultar')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'rgba(82, 113, 255, 0.7)',
  },
  userImg: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60,
    marginBottom: 10,
  },
});
