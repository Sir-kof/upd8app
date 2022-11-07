import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {windowWidth} from '../utils/Dimensions';

const ListUsers = ({
  cpf,
  name,
  address,
  birthday,
  gender,
  state,
  city,
}: any) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.product}>
          <View style={styles.viewHeaderProduct}>
            <View style={styles.viewImgText}>
              <View style={styles.viewTexProduct}>
                <Text style={styles.productText1}>{name}</Text>
                <Text style={styles.cpf}>{cpf}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
              {birthday}
            </View>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.priceProduct}>
              {address},{city} - {state}
            </Text>
            <Text style={[styles.gender]}>{gender}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'rgba(82, 113, 255, 0.7)',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  product: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 2,
    flex: 1,
  },
  viewHeaderProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewImgText: {
    flexDirection: 'row',
    padding: 2,
  },
  viewTexProduct: {
    top: 10,
    left: 6,
    width: windowWidth - 220,
  },
  priceProduct: {
    color: '#919191',
    left: 6,
    paddingLeft: 65,
    fontFamily: 'Roboto-Medium',
  },
  productText1: {
    color: '#333',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  cpf: {
    color: '#919191',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  gender: {
    color: '#00008B',
    margin: 3,
    marginTop: 1,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});

export default ListUsers;
