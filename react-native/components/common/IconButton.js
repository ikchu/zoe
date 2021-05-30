import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = (props) => {
  return (
    <Pressable onPress={props.onPress} style={props.style}>
      <Icon name={props.iconName} size={props.size} color={props.color} />
    </Pressable>
  );
};

export default IconButton;
