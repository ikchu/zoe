import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import APIAbsolute from '../../axios/apiAbsolute';
import PostDetailHeader from '../../components/posts/PostDetailHeader';
import ImageCard from '../../components/posts/ImageCard';

const PostDetailScreen = ({route, navigation}) => {
  const {post} = route.params;

  const [user, setUser] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    APIAbsolute.get(post.user, {headers: {Authorization: `Token ${token}`}})
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [post.user, token, user.profile]);

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <PostDetailHeader user={user} />
      <ImageCard
        uri={post.pic}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
      />
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // safeArea: {
  //   alignItems: 'center',
  //   flex: 1,
  // },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  imageContainer: {
    height: '65%',
    paddingTop: 10,
  },
});

export default PostDetailScreen;
