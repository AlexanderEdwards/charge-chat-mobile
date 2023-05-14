// src/components/InputField.js
import React from 'react';
import { TextInput } from 'react-native';

export default function InputField({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}