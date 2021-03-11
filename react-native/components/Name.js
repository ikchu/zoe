import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const Name = (props) => {
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
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
});

export default Name;
