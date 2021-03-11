import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Description = (props) => {
  return (
    <View style={styles.textBox}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
});

export default Description;
