import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import PostCard from './PostCard';

import API from '../../axios/api';

const VerticalFeed = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/posts/')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
                <PostCard post={item} />
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

export default VerticalFeed;
