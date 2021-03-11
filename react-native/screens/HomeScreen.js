import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../components/Header';
import PostCard from '../components/PostCard';

function HomeScreen() {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.feedContainer}>
        <Header>All Posts</Header>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            // I think this uses post description as key?? Can't guarantee uniqueness
            keyExtractor={({description}, index) => description}
            renderItem={({item}) => <PostCard post={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1,
  },
  feedContainer: {
    flex: 1,
    width: '90%',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;
