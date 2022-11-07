import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const InputField = ({label, icon, keyboardType, value, onChangeText}: any) => {
  return (
    <View style={styles.viewInput}>
      {icon}
      <TextInput
        placeholder={label}
        placeholderTextColor="#ddd"
        keyboardType={keyboardType}
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomEndRadius: 1,
    marginBottom: 10,
    padding: 5,
    margin: 15,
  },
  textInput: {
    color: '#ddd',
    flex: 1,
    fontSize: 18,
    paddingVertical: 0,
  },
});

export default InputField;
