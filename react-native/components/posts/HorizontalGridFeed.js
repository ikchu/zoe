import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import GridPost from './GridPost';

import API from '../../axios/api';

const VeritcalGridFeed = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    API.get('/posts/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <View style={styles.feedContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  props.navigation.navigate('Details', {post: item})
                }
                style={styles.pressable}>
                <GridPost post={item} />
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
    flex: 1,
    width: '100%',
  },
  pressable: {
    flex: 1,
  },
});

export default VeritcalGridFeed;
