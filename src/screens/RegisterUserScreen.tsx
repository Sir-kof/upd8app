import React, {useEffect, useState} from 'react';
import {
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

const RegisterUserScreen = ({navigation}: any) => {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('Data de nascimento');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [uf, setUf] = React.useState('AC');
  const [listUf, setListUf] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [listCity, setListCity] = React.useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const limpar = () => {
    setCpf('');
    setName('');
    setAddress('');
    setSelectedDate('Data de nascimento');
    setChecked(false);
    setGender('');
    setUf('AC');
    setCity('');
    setIsFocus(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: React.SetStateAction<string>) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  function loadUf() {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a: {nome: string}, b: {nome: any}) =>
          a.nome.localeCompare(b.nome),
        );
        setListUf([
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
          ...data.map((item: { nome: any; sigla: any; }) => ({label: item.nome, value: item.sigla})),
          ,
        ]);
      });
  }
  useEffect(() => {
    loadUf();
  }, []);
  useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

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
              <Text style={styles.mainText}>Cadastrar Usuários</Text>
            </View>
          </View>
          <View style={{height: '40%'}}>
            <InputField
              label={'Digite o CPF'}
              icon={
                <FontAwesome5
                  name="address-card"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={cpf}
              onChangeText={text => setCpf(text)}
            />

            <InputField
              label={'Digite o nome'}
              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={name}
              onChangeText={text => setName(text)}
            />

            <InputField
              label={'Digite o endereço'}
              icon={
                <Entypo
                  name="address"
                  size={20}
                  color="#ddd"
                  style={{paddingTop: 3}}
                />
              }
              value={address}
              onChangeText={text => setAddress(text)}
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
                  {selectedDate === 'Data de nascimento'
                    ? 'Data de nascimento'
                    : moment(selectedDate).format('DD/MM/YYYY')}
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
                  status={checked && gender === 'M' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                    setGender('M');
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ddd'}}>Feminino</Text>
                <Checkbox
                  status={checked && gender === 'F' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
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
                data={listUf}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Estado' : '...'}
                searchPlaceholder="Procurar..."
                value={uf}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setUf(item.value);
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

            <CustomButton label={'Registrar'} onPress={() => {}} />
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
