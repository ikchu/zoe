import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import APIAbsolute from '../../axios/apiAbsolute';
import Name from '../Name';
import ProfilePicThumbnail from '../common/ProfilePicThumbnail';
import Description from './Description';
import ImageCard from './ImageCard';

const PostDetailHeader = (props) => {
  const [profile, setProfile] = useState([]);

  const token = useSelector((state) => state.ar.token);

  // TODO: this fetch throws an error because the first time it is called,
  // the PostDetailScreen still hasn't resolved the user, therefore props.user
  // here is undefined. The second time around, props.user is defined, so the
  // profile is loaded properly. Right now, I just silence the first error, but
  // there must be a way to avoid that problem altogether. How to ensure that
  // this fetch call happens after the PostDetailScreen fetch call finishes?
  useEffect(() => {
    APIAbsolute.get(props.user.profile, {
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => setProfile(response.data))
      .catch((error) => console.log('PostDetailHeader (silenced): ' + error));
  }, [props.user.profile, token]);

  return (
    <View style={styles.container}>
      <ProfilePicThumbnail uri={profile.image} />
      <View style={styles.name}>
        <Name>{props.user.username}</Name>
        <Description>Location PlaceHolder</Description>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default PostDetailHeader;
