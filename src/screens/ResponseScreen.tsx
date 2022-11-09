import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import companyImg from '../assets/images/upd8.jpg';
import {dataUsers} from '../model/data';
import SelectUser from '../components/SelectUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ResponseScreen({navigation, route}: any) {
  const {cpf, name, address, birthday, gender, state, city} = route.params.data;
  const [list, setList] = useState(route.params.data);

  // function loadUsers(cpf) {
  //   let url = 'http://127.0.0.1:5050/api/user/12345678900';
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       data.sort((a, b) => a.nome.localeCompare(b.nome));
  //       console.log([...data]);
  //     })
  //     .catch(function (error) {
  //       console.log('A um problema aqui: ' + error.message);
  //       throw error;
  //     });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tabTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              top: 10,
            }}>
            <MaterialIcons name="arrow-back-ios" color="#ddd" size={40} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{marginTop: 30}}>
            <Image source={companyImg} style={styles.userImg} />
          </View>
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 10}}>
            Resultado da Consulta
          </Text>

          <View style={styles.scrollAreaSelected}>
            <SelectUser
              key={cpf}
              cpf={cpf}
              name={name}
              address={address}
              birthday={birthday}
              gender={gender}
              state={state}
              city={city}
              onPress={() =>
                navigation.navigate('User', {
                  cpf: cpf,
                  name: name,
                  address: address,
                  birthday: birthday,
                  gender: gender,
                  state: state,
                  city: city,
                })
              }
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
  tabTop: {
    width: '100%',
    marginLeft: 10,
    top: 5,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImg: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60,
    marginBottom: 10,
  },
  scrollAreaSelected: {
    height: 600,
    backgroundColor: '#ddd',
    flexGrow: 0,
    flexDirection: 'column',
    paddingTop: '5%',
    padding: 10,
    top: '4%',
  },
});
