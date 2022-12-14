import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import env from '../config/env';
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

const initialState = {
  cpf: '',
  name: '',
  address: '',
  birthday: 'Data de nascimento',
  isDatePickerVisible: false,
  gender: '',
  state: '',
  stateName: '',
  city: '',
  isFocus: false,
  checked: 'unchecked',
};

const RegisterUserScreen = ({navigation}: any) => {
  const [cpf, setCpf] = useState(initialState.cpf);
  const [name, setName] = useState(initialState.name);
  const [address, setAddress] = useState(initialState.address);
  const [birthday, setBirthday] = useState(initialState.birthday);
  const [checked, setChecked] = useState(initialState.checked);
  const [gender, setGender] = useState(initialState.gender);
  const [state, setState] = useState(initialState.state);
  const [states, setStates] = useState([]);
  const [stateName, setStateName] = useState(initialState.stateName);
  const [city, setCity] = useState(initialState.city);
  const [listCity, setListCity] = useState([]);
  const [isFocus, setIsFocus] = useState(initialState.isFocus);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(
    initialState.isDatePickerVisible,
  );

  const limpar = () => {
    setCpf(initialState.cpf);
    setName(initialState.name);
    setAddress(initialState.address);
    setBirthday(initialState.birthday);
    setChecked(initialState.checked);
    setGender(initialState.gender);
    setState(initialState.gender);
    setStateName(initialState.stateName);
    setCity(initialState.city);
    setIsFocus(false);
  };

  const validateCpf = cpf.length === 11;
  const validateName = name && name.length >= 3;
  const validateAddress = address && address.length >= 5;
  const validateBirthday = birthday && birthday !== initialState.birthday;
  const validateGender = gender.length === 1;
  const validateState = state.length > 0;
  const validateCity = city.length > 0;

  const validations = [];
  validations.push(validateCpf);
  validations.push(validateName);
  validations.push(validateAddress);
  validations.push(validateBirthday);
  validations.push(validateGender);
  validations.push(validateState);
  validations.push(validateCity);

  const validForm = validations.reduce((t, a) => t && a);

  const characterValidator = () => {
    return (
      <Text
        style={{
          color: 'red',
        }}>
        *
      </Text>
    );
  };

  const birthdayValidator = () => {
    return (
      <Text
        style={{
          color: 'red',
        }}>
        Revise este campo
      </Text>
    );
  };

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
  }, [state]);

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
              <Text style={styles.mainText}>Cadastrar Usu??rios</Text>
            </View>
          </View>
          <View style={{height: '40%'}}>
            <InputField
              label={'Digite o CPF'}
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
              onChangeText={(text: React.SetStateAction<string>) => {
                setCpf(text);
              }}
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
              onChangeText={(text: React.SetStateAction<string>) => {
                setName(text);
              }}
            />

            <InputField
              label={'Digite o endere??o'}
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
              onChangeText={(text: React.SetStateAction<string>) => {
                setAddress(text);
              }}
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
                  {birthday === initialState.birthday
                    ? initialState.birthday
                    : moment(birthday).format('DD/MM/YYYY')}
                </Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Text>
                  {birthday === initialState.birthday
                    ? birthdayValidator()
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.viewGender}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={20}
                color="#ddd"
                style={{paddingTop: 3}}
              />
              <Text style={styles.textInput}>
                Sexo
                {gender === initialState.gender ? characterValidator() : ''}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ddd'}}>Masculino</Text>
                <Checkbox
                  status={
                    checked === 'checked' && gender === 'M'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setChecked('checked');
                    setGender('M');

                    if (checked === 'checked' && gender === 'M') {
                      setChecked('checked');
                      setGender(initialState.gender);
                    }
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ddd'}}>Feminino</Text>
                <Checkbox
                  status={
                    checked === 'checked' && gender === 'F'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setChecked('checked');
                    setGender('F');

                    if (checked === 'checked' && gender === 'F') {
                      setChecked('checked');
                      setGender(initialState.gender);
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.dropView}>
              {state === initialState.state ? characterValidator() : ''}
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
                placeholder={!isFocus ? 'Estado' : '...'}
                searchPlaceholder="Procurar..."
                value={state}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setStateName(item.label);
                  setState(item.value);
                  setIsFocus(false);
                }}
              />

              {city === initialState.city ? characterValidator() : ''}
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
                placeholder={!isFocus ? 'Cidade' : '...'}
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
              label={'Registrar'}
              style={validForm ? {} : {backgroundColor: '#AAA'}}
              disabled={!validForm}
              onPress={() => {
                if (!validForm) {
                  Alert.alert('Revise todos os campos antes de prosseguir');
                  return new Error();
                } else {
                  let _data = {
                    cpf: cpf,
                    name: name,
                    address: address,
                    birthday: birthday,
                    gender: gender,
                    state: stateName,
                    city: city,
                  };
                  const url = `${env.baseUrl}:${env.port}/api/user`;
                  fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(_data),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
                  Alert.alert('Cadastro Realizado com sucesso');
                  navigation.navigate('Home');
                }
              }}
            />
            <CustomButton label={'Limpar'} onPress={limpar} />
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

export default RegisterUserScreen;
