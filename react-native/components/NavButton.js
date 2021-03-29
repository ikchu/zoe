import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MontserratR from './text/MontserratR';

import Colors from '../constants/colors';

const NavButton = (props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={styles.container}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}>
      <Icon
        name={pressed ? props.iconName : props.iconName + '-outline'}
        size={30}
        color={Colors.c1}
      />
      <MontserratR>{props.text}</MontserratR>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default NavButton;
