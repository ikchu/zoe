import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const Name = (props) => {
  return (
    <View style={styles.textBox}>
      <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    marginBottom: 2,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.c4,
  },
});

export default Name;
