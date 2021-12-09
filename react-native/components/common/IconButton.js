import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MontserratR from '../text/MontserratR';

const IconButton = (props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={props.style}>
      {props.invert ? (
        <Icon
          name={pressed ? props.iconName : props.iconName + '-outline'}
          size={props.iconSize}
          color={props.iconColor}
        />
      ) : (
        <Icon
          name={props.iconName}
          size={props.iconSize}
          color={props.iconColor}
        />
      )}
      {props.text !== undefined && (
        <MontserratR style={props.textStyle}>{props.text}</MontserratR>
      )}
    </Pressable>
  );
};

export default IconButton;
