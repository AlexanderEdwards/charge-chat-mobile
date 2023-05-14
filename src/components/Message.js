// src/components/Message.js
import React from 'react';
import { View, Text } from 'react-native';

export default function Message({ sender, text }) {
  return (
    <View>
      <Text>{sender}: {text}</Text>
    </View>
  );
}