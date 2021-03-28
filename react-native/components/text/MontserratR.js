import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

const MontserratR = (props) => {
  return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.c1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});

export default MontserratR;
