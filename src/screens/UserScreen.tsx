import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Checkbox} from 'react-native-paper';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

import companyImg from '../assets/images/upd8.jpg';
import env from '../config/env';

const UserScreen = ({navigation, route}: any) => {
  const [cpf, setCpf] = useState(route.params.cpf);
  const [name, setName] = useState(route.params.name);
  const [address, setAddress] = useState(route.params.address);
  const [birthday, setBirthday] = useState(route.params.birthday);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState(route.params.gender);
  const [state, setState] = useState(route.params.state);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState(route.params.city);
  const [listCity, setListCity] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [erase, setErase] = useState(false);

  const validateCpf = cpf.length === 11 && cpf !== route.params.cpf;
  const validateName = name && name.length >= 3 && name !== route.params.name;
  const validateAddress =
    address && address.length >= 5 && address !== route.params.address;
  const validateBirthday = birthday && birthday !== route.params.birthday;
  const validateState = state.length > 0 && state !== route.params.state;
  const validateCity = city.length > 0 && city !== route.params.city;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: React.SetStateAction<string>) => {
    setBirthday(date);
    hideDatePicker();
  };

  function loadState() {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a: {nome: string}, b: {nome: any}) =>
          a.nome.localeCompare(b.nome),
        );
        setStates([
          ...data.map((item: {nome: any; sigla: any}) => ({
            label: item.nome,
            value: item.sigla,
          })),
        ]);
      });
  }
  function loadCity(id: string) {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${id}/municipios`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a: {nome: string}, b: {nome: any}) =>
          a.nome.localeCompare(b.nome),
        );
        setListCity([
          ...data.map((item: {nome: any; sigla: any}) => ({
            label: item.nome,
            value: item.nome,
          })),
          ,
        ]);
      });
  }
  useEffect(() => {
    loadState();
  }, []);
  useEffect(() => {
    if (state) {
      loadCity(state);
    }
    route.params.gender === 'M' ? setGender('M') : setGender('F');
  }, [state, route.params.gender]);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{paddingBottom: 2}}>
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
            <View style={{top: 0}}>
              <View>
                <TouchableOpacity>
                  <ImageBackground
                    source={companyImg}
                    style={styles.imgUser}
                    imageStyle={{borderRadius: 80}}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.mainText}>Informações do Usuário</Text>
            </View>
          </View>
          <View style={{height: '40%'}}>
            <InputField
              label={cpf.toString()}
              editable={false}
              selectTextOnFocus={false}
              valid={
                validateCpf
                  ? {borderBottomColor: 'green'}
                  : {borderBottomColor: '#ccc'}
              }
              icon={
                <FontAwesome5
                  name="address-card"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={cpf}
              onChangeText={(text: React.SetStateAction<string>) =>
                setCpf(text)
              }
            />

            <InputField
              label={'Digite o nome'}
              valid={
                validateName
                  ? {borderBottomColor: 'green'}
                  : {borderBottomColor: '#ccc'}
              }
              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={name}
              onChangeText={(text: React.SetStateAction<string>) =>
                setName(text)
              }
            />

            <InputField
              label={'Digite o endereço'}
              valid={
                validateAddress
                  ? {borderBottomColor: 'green'}
                  : {borderBottomColor: '#ccc'}
              }
              icon={
                <Entypo
                  name="address"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={address}
              onChangeText={(text: React.SetStateAction<string>) =>
                setAddress(text)
              }
            />

            <TouchableOpacity onPress={showDatePicker}>
              <View style={styles.viewInput}>
                <FontAwesome5
                  name="calendar-alt"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
                <Text style={styles.textInput}>
                  {moment(birthday).format('DD/MM/YYYY')}
                </Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.viewGender}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={20}
                color="#ddd"
                style={{paddingTop: 3}}
              />
              <Text style={styles.textInput}>Sexo</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ddd'}}>Masculino</Text>
                <Checkbox
                  status={gender === 'M' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('M');
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ddd'}}>Feminino</Text>
                <Checkbox
                  status={gender === 'F' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('F');
                  }}
                />
              </View>
            </View>

            <View style={styles.dropView}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: '#ddd'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={states}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? state : '...'}
                searchPlaceholder="Procurar..."
                value={state}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setState(item.value);
                  setIsFocus(false);
                }}
              />

              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: '#ddd'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={listCity}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? city : '...'}
                searchPlaceholder="Procurar..."
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCity(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <CustomButton
              label={'Salvar/Alterar'}
              style={
                (validateName ||
                  validateAddress ||
                  validateBirthday ||
                  validateState ||
                  validateCity) === true
                  ? {}
                  : {backgroundColor: '#AAA'}
              }
              disabled={
                (validateName ||
                  validateAddress ||
                  validateBirthday ||
                  validateState ||
                  validateCity) === true
              }
              onPress={() => {
                if (
                  validateName ||
                  validateAddress ||
                  validateBirthday ||
                  validateState ||
                  validateCity
                ) {
                  let _data = {
                    name: name,
                    address: address,
                    birthday: birthday,
                    state: state,
                    city: city,
                  };
                  const url = `${env.baseUrl}:${env.port}/api/user/${route.params.cpf}`;
                  fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(_data),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
                  Alert.alert('Cadastro atualizado com sucesso!');
                  navigation.navigate('Home');
                } else {
                  Alert.alert('Nenhum campo foi alterado');
                  return new Error();
                }
              }}
            />
            <CustomButton
              label={'Apagar Usuário'}
              style={erase === true ? {} : {backgroundColor: '#AAA'}}
              disabled={erase === false}
              onPress={() => {
                if (erase === false) {
                  Alert.alert(
                    `Apagar o Cadastro do usuário ${name} ? Clique novamente`,
                  );
                  setErase(true);
                } else {
                  const url = `${env.baseUrl}:${env.port}/api/user/${route.params.cpf}`;
                  fetch(url, {
                    method: 'DELETE',
                  });
                  Alert.alert('Cadastro apagado com sucesso!');
                  navigation.navigate('Home');
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5271ff',
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
  imgUser: {
    alignSelf: 'center',
    width: 125,
    height: 125,
  },
  mainText: {
    alignSelf: 'center',
    color: '#ddd',
    fontSize: 22,
    padding: 5,
  },
  viewInput: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomEndRadius: 1,
    marginBottom: 10,
    padding: 5,
    margin: 15,
  },
  viewGender: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 5,
    margin: 15,
  },
  textInput: {
    color: '#ddd',
    flex: 1,
    fontSize: 18,
    left: 5,
    paddingVertical: 0,
  },
  dropView: {
    backgroundColor: '#5271ff',
    padding: 20,
    borderRadius: 15,
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ddd',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#ddd',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#ddd',
  },
});

export default UserScreen;
