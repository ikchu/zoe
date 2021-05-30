import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import APIAbsolute from '../../axios/apiAbsolute';
import Colors from '../../constants/colors';
import ImageCard from './ImageCard';
import MontserratR from '../text/MontserratR';

const GridPost = (props) => {
  const [user, setUser] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    APIAbsolute.get(props.post.user, {
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [props.post.user, token]);

  return (
    <View style={styles.container}>
      <ImageCard
        uri={props.post.pic}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <MontserratR style={styles.name}>{user.username}</MontserratR>
        <MontserratR style={styles.description}>
          {props.post.description}
        </MontserratR>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  imageContainer: {
    height: 120,
    width: 120,
  },
  details: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: Colors.c1,
  },
  name: {
    color: Colors.c4,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.c3,
    fontWeight: 'bold',
  },
});

export default GridPost;
