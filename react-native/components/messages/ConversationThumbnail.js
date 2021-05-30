import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import APIAbsolute from '../../axios/apiAbsolute';
import ProfilePicThumbnail from '../common/ProfilePicThumbnail';
import AbhayaSB from '../text/AbhayaSB';
import MontserratR from '../text/MontserratR';
import Colors from '../../constants/colors';

const Message = (props) => {
  const [message, setMessage] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    APIAbsolute.get(props.url, {
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));
  }, [props.url, token]);

  return <MontserratR style={styles.message}>{message.message}</MontserratR>;
};

const ConversationThumbnail = (props) => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    APIAbsolute.get(props.conversation.members[1], {
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [props.conversation.members, token]);

  // TODO: I'm doing the same hacky thing (silencing fetch error) as in PostDetailHeader.js
  // Eventually need to find a way to do two fetches in a row without that error
  useEffect(() => {
    APIAbsolute.get(user.profile, {headers: {Authorization: `Token ${token}`}})
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  }, [user.profile, token]);

  if (props.conversation.messages.length <= 0) {
    return null;
  }

  return (
    <View style={styles.outer}>
      <ProfilePicThumbnail
        uri={profile.image}
        cardStyle={styles.card}
        imageStyle={styles.image}
      />
      <View style={styles.inner}>
        <AbhayaSB style={styles.name}>
          {user.name ? user.name : user.username}
        </AbhayaSB>
        <Message
          url={
            // is the last element guaranteed to be the most recent message? maybe I can change the order in django instead
            props.conversation.messages[props.conversation.messages.length - 1]
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    height: 60,
    // borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
  },
  inner: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  card: {
    width: 60,
    height: 60,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0,
  },
  name: {
    fontSize: 20,
    color: Colors.c5,
  },
  message: {
    // fontSize: 20,
    color: Colors.c4,
  },
});

export default ConversationThumbnail;
