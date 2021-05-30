import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import API from '../../axios/api';
import APIAbsolute from '../../axios/apiAbsolute';
import Colors from '../../constants/colors';
import IconButton from '../../components/common/IconButton';

// TODO: move this out into its own file eventually
const Message = (props) => {
  const [message, setMessage] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    APIAbsolute.get(props.url, {headers: {Authorization: `Token ${token}`}})
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));
  }, [props.url, token]);

  return <Text>{message.message}</Text>;
};

const ConversationScreen = (props) => {
  const {conversation} = props.route.params;

  const [message, setMessage] = useState('');

  const token = useSelector((state) => state.ar.token);

  const messageInputHandler = (e) => {
    setMessage(e);
  };

  const sendMessageHandler = useCallback(
    (data) => {
      API.post('/messages/', {conversation: conversation.url, message: message, headers: {Authorization: `Token ${token}`}})
        .then(async (response) => {
          console.log(response);
          // Do something else here?
        })
        .catch((error) => console.log(error));
    },
    [conversation.url, message, token],
  );

  // TODO: find way to fetch name for each member hyperlink
  // for (let member of conversation.members) {
  //   console.log(member);
  // }
  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({headerTitle: 'Placeholder'});
  });
  return (
    <View>
      <View style={{height: "94%", padding: 10}}>
        <FlatList
          data={conversation.messages}
          keyExtractor={(item) => item.url}
          numColumns={1}
          renderItem={({item}) => {
            // check item.sender. If me, return a RightMessage, otherwise LeftMessage
            return <Message url={item} />;
          }}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.messageOuterContainer}>
          <View style={styles.messageInnerContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="ascii-capable"
              placeholderTextColor="white"
              style={styles.messageInput}
              {...props}
            />
          </View>
          <Button title="send" color={Colors.c5} onPress={sendMessageHandler} />
        </View>
        <IconButton iconName="mic-circle-outline" size={30} color={Colors.c4} />
        <IconButton iconName="radio-button-on" size={30} color={Colors.c4} />
        <IconButton iconName="scan-circle-outline" size={30} color={Colors.c4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: Colors.c2,
    borderRadius: 20,
    width: '70%',
    marginHorizontal: 10,
  },
  messageInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageInput: {
    color: Colors.c1,
    flex: 1,
    width: '90%',
  },
});

export default ConversationScreen;
