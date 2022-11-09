import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const InputField = ({
  label,
  icon,
  keyboardType,
  editable,
  selectTextOnFocus,
  valid,
  value,
  onChangeText,
}: any) => {
  return (
    <View>
      <View style={[styles.viewInput, valid]}>
        {icon}
        <TextInput
          placeholder={label}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          placeholderTextColor="#ddd"
          keyboardType={keyboardType}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
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
