import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const Description = (props) => {
  return (
    <View style={styles.textBox}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    marginBottom: 0,
  },
  text: {
    fontSize: 12,
    color: Colors.light,
  },
});

export default Description;
