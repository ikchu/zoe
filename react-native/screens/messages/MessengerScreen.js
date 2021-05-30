import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import API from '../../axios/api';
import ConversationThumbnail from '../../components/messages/ConversationThumbnail';
import IconButton from '../../components/common/IconButton';
import Colors from '../../constants/colors';

const MessengerScreen = (props) => {
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <IconButton
          iconName="create"
          size={28}
          color={Colors.c4}
          style={styles.composeButton}
          onPress={() => props.navigation.navigate('New Message')}
        />
      ),
    });
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    API.get('/conversations/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <View style={styles.messengerContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.url}
          numColumns={1}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  props.navigation.navigate('Conversation', {
                    conversation: item,
                  })
                }>
                <ConversationThumbnail conversation={item} />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messengerContainer: {
    flex: 1,
    backgroundColor: Colors.c1,
  },
  composeButton: {
    paddingRight: 12,
  },
});

export default MessengerScreen;
