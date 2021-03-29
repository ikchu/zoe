import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

const MontserratBC = (props) => {
  return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.c1,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default MontserratBC;
