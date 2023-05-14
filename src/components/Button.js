// src/components/Button.js

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../screens/ChatScreen.styles';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
