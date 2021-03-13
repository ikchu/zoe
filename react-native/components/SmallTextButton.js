import React, {useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const SmallTextButton = (props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      // onPress={props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <Text style={pressed ? styles.pressed : styles.unpressed}>
        {props.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    color: 'royalblue',
  },
  unpressed: {
    color: 'cornflowerblue',
  },
});

export default SmallTextButton;
