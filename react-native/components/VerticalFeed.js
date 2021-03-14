import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import Header from './Header';
import PostCard from './PostCard';

const VerticalFeed = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.188:8888/api/posts/?format=json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.feedContainer}>
      <Header>All Posts</Header>
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
                onPress={() => props.navigation.navigate('Details')}
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
  pressable: {
    margin: 10,
    marginBottom: 40,
    flex: 1,
    height: 170,
    alignItems: 'center',
  },
  feedContainer: {
    flex: 1,
    width: '90%',
  },
});

export default VerticalFeed;
