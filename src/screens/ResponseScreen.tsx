import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';

import companyImg from '../assets/images/upd8.jpg';
import ListUsers from '../components/ListUsers';

export default function ResponseScreen({navigation, route}) {
  const [list, setList] = useState([]);

  // function loadUsers(cpf) {
  //   let url = 'http://localhost:5050/api/user/12345678900';
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       data.sort((a, b) => a.nome.localeCompare(b.nome));
  //       setList([...data]);
  //     });
  // }

  function renderItem({item}) {
    return (
      <ListUsers
        photo={item.poster}
        product={item.product}
        isAvaliable={item.isAvaliable}
        time={item.time}
        price={item.price}
      />
    );
  }
  function renderItemId(item) {
    return item.id;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{marginTop: 30}}>
            <Image source={companyImg} style={styles.userImg} />
          </View>
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 10}}>
            Resultado da Consulta
          </Text>

          <View style={styles.scrollAreaSelected}>
            <FlatList
              style={{flexGrow: 0}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginBottom: 30}}
              nestedScrollEnabled
              data={list}
              renderItem={renderItem}
              keyExtractor={renderItemId}
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
  scrollAreaSelected: {
    height: 600,
    backgroundColor: '#ddd',
    flexGrow: 0,
    flexDirection: 'column',
    paddingTop: '30%',
    padding: 10,
    top: '4%',
  },
});
