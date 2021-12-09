import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Name from '../Name';
import Description from '../posts/Description';
import ImageCard from '../posts/ImageCard';
import IconButton from '../common/IconButton';
import Colors from '../../constants/colors';

const ProfileHeader = (props) => {
  const navigation = useNavigation();

  if (props.profile.image === null) {
    // props.profile.image = 'http://192.168.1.188:8888/static/img/default.png';
    props.profile.image = 'http://127.0.0.1:8000/static/img/default.png';
  }
  return (
    <View style={styles.container}>
      <ImageCard
        uri={props.profile.image}
        cardStyle={styles.imageContainer}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.name}>
        <Name style={{fontSize: 25}}>{props.user.name}</Name>
        <Description>Location PlaceHolder</Description>
        <Description>{props.profile.bio}</Description>
        <View style={styles.iconRow}>
          <IconButton
            iconName="color-palette-outline"
            iconSize={20}
            iconColor={Colors.c4}
            style={styles.icon}
            onPress={() => navigation.navigate('Tailor')}
          />
          <IconButton
            iconName="person-outline"
            iconSize={20}
            iconColor={Colors.c4}
            style={styles.icon}
            onPress={() =>
              Alert.alert('TODO', 'Not sure what this button should do lol', [
                {text: 'Dismiss', style: 'cancel'},
              ])
            }
            // TODO: I'm not sure what this button should do...
          />
          <IconButton
            iconName="search-outline"
            iconSize={20}
            iconColor={Colors.c4}
            style={styles.icon}
            onPress={() => navigation.navigate('Search Users')}
            // TODO: Is this really the best place to put the user search feature?
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 120,
    height: 120,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
  },
  iconRow: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
});

export default ProfileHeader;
