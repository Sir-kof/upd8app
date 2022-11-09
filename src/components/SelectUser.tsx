import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {windowWidth} from '../utils/Dimensions';

const SelectUser = ({
  cpf,
  name,
  address,
  birthday,
  gender,
  state,
  city,
  onPress,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.viewHeaderProduct}>
            <View style={styles.viewImgText}>
              <View style={styles.viewTexProduct}>
                <Text style={styles.productText1}>
                  Nome:{''}
                  <Text style={{textTransform: 'capitalize'}}>{name}</Text>
                </Text>
                <Text numberOfLines={1} style={styles.cpf}>
                  CPF: {cpf}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
              <Text style={styles.birthday}>
                {birthday.split('').reverse().join('')}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.address}>
              {address}, {city} - {state}
            </Text>
            <View style={styles.gender}>
              <Text style={[styles.textButtonGender]}>
                {gender === 'F' ? 'Feminino' : 'Masculino'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'rgba(128, 208, 199, 0.8)',
    borderRadius: 30,
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  viewHeaderProduct: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewImgText: {
    flexDirection: 'row',
  },
  viewTexProduct: {
    left: 6,
    width: windowWidth - 220,
  },
  gender: {
    flexDirection: 'row',
    marginRight: 15,
    height: 25,
    paddingRight: 8,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    color: '#919191',
    left: 6,
    marginTop: 5,
    fontFamily: 'Roboto-Medium',
  },
  birthday: {
    top: 2,
    color: '#919191',
    marginRight: 25,
    fontFamily: 'Roboto-Medium',
  },
  productText1: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  cpf: {
    color: '#919191',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  textButtonGender: {
    color: '#00008B',
    margin: 3,
    marginTop: 1,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});

export default SelectUser;
