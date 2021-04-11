import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import AbhayaSB from '../components/text/AbhayaSB';

const Name = (props) => {
  return (
    <View style={styles.textBox}>
      <AbhayaSB style={{...styles.text, ...props.style}}>
        {props.children}
      </AbhayaSB>
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
