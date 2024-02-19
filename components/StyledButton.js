import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const StyledButton = ({ text, handler, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={() => handler(text)}>
      <Text style={[styles.buttonText, style && style.buttonText]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#333333',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default StyledButton;