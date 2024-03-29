import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ListPost from './ListPost';
import API from '../../axios/api';
import Colors from '../../constants/colors';
import IconButton from '../common/IconButton';

const VerticalListFeed = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    API.get('/posts/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [token]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="add"
          iconSize={30}
          iconColor={Colors.c4}
          style={styles.headerButton}
          onPress={() => navigation.navigate('New Post')}
        />
      ),
    });
  });

  return (
    <View style={styles.feedContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => navigation.navigate('Details', {post: item})}
                style={styles.pressable}>
                <ListPost post={item} />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    backgroundColor: Colors.c15,
    flex: 1,
    // width: '100%',
    paddingTop: 20,
  },
  pressable: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerButton: {
    paddingRight: 12,
  },
});

export default VerticalListFeed;
