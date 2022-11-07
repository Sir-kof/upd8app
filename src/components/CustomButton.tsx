import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({label, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonLogin}>
      <Text style={styles.textButtonLogin}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#5271ff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  textButtonLogin: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    color: '#5271ff',
  },
});

export default CustomButton;
