import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.darkText,
    fontSize: 25,
    marginBottom: 5,
  },
});

export default Header;
