import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

import API from '../../axios/api';
import Colors from '../../constants/colors';
import IconButton from '../../components/common/IconButton';
import WideButton from '../../components/common/WideButton';
import ImageCard from '../../components/posts/ImageCard';
import MontserratBC from '../../components/text/MontserratBC';
import ProfilePicThumbnail from '../../components/common/ProfilePicThumbnail';

const NewPostInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <MontserratBC style={styles.inputDescription}>{props.text}</MontserratBC>
      <TextInput
        placeholder="..."
        placeholderTextColor="grey"
        style={styles.textInput}
        keyboardType="ascii-capable"
        autoCorrect={false}
        ref={props.innerRef}
        blurOnSubmit={false}
        {...props}
      />
    </View>
  );
};

const NewPostScreen = (props) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const user_hyperlink = useSelector((state) => state.ar.user);
  const token = useSelector((state) => state.ar.token);

  const trim = user_hyperlink.replace(/\/$/, '');
  const userid = trim.split('/').pop();

  useEffect(() => {
    API.get(`/profiles/${userid}/`, {
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, [token, userid]);

  const descriptionInputHandler = (e) => {
    setDescription(e);
  };

  const imageSelectionHandler = () => {
    ImagePicker.openPicker({width: 300, height: 300, cropping: true})
      .then((selectedImage) => setImage(selectedImage))
      .catch((error) => console.log(error));
  };

  const cameraHandler = () => {
    ImagePicker.openCamera({width: 300, height: 300, cropping: true})
      .then((selectedImage) => setImage(selectedImage))
      .catch((error) => console.log(error));
  };

  const shareHandler = useCallback(() => {
    const data = new FormData();
    data.append('description', description);
    data.append('pic', {
      uri: image.path,
      name: image.filename,
      type: image.mime,
    });
    data.append('user', user_hyperlink);
    API.post('/posts/', data, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }).catch((error) => console.log(error));
    props.navigation.navigate('Posts');
  }, [description, props.navigation, token, user_hyperlink]);

  return (
    <Pressable
      style={styles.screenContainer}
      onPress={() => Keyboard.dismiss()}>
      {/* {image !== null && <Text>{image.filename}</Text>} */}
      {image !== null ? (
        <View style={styles.description}>
          <ImageCard
            uri={image.path}
            cardStyle={styles.card}
            style={styles.image}
          />
          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor="grey"
            multiline={true}
            style={styles.descriptionInput}
            onChangeText={descriptionInputHandler}
          />
        </View>
      ) : (
        <View style={styles.description}>
          <ProfilePicThumbnail
            uri={profile.image}
            cardStyle={styles.card}
            imageStyle={styles.profilePic}
          />
          <TextInput
            placeholder="Write a status..."
            placeholderTextColor="grey"
            multiline={true}
            style={styles.descriptionInput}
            onChangeText={descriptionInputHandler}
          />
        </View>
      )}
      <View style={styles.iconRow}>
        <IconButton
          iconName="image"
          invert={true}
          iconSize={30}
          iconColor={Colors.c4}
          text="Photos"
          textStyle={styles.iconText}
          style={styles.iconButton}
          onPress={imageSelectionHandler}
        />
        <IconButton
          iconName="camera"
          invert={true}
          iconSize={30}
          iconColor={Colors.c4}
          text="Camera"
          textStyle={styles.iconText}
          style={styles.iconButton}
          onPress={cameraHandler}
        />
        <IconButton
          iconName="color-palette"
          invert={true}
          iconSize={30}
          iconColor={Colors.c4}
          text="Design"
          textStyle={styles.iconText}
          style={styles.iconButton}
          onPress={() =>
            Alert.alert('TODO', [{text: 'Dismiss', style: 'cancel'}])
          }
        />
      </View>
      <View style={styles.rowsContainer}>
        <NewPostInput
          text="Location"
          onSubmitEditing={() => {
            this.secondInput.focus();
          }}
        />
        <NewPostInput
          text="Category"
          innerRef={(input) => {
            this.secondInput = input;
          }}
          onSubmitEditing={() => {
            this.thirdInput.focus();
          }}
        />
        <NewPostInput
          text="Link"
          innerRef={(input) => {
            this.thirdInput = input;
          }}
        />
        <WideButton
          text="Share"
          containerStyle={styles.shareButton}
          textStyle={styles.shareButtonText}
          onPress={() => shareHandler()}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 100,
    borderBottomWidth: 3,
    borderColor: Colors.c15,
  },
  card: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  image: {
    width: 70,
    height: 70,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: StyleSheet.hairlineWidth,
  },
  descriptionInput: {
    flex: 1,
    height: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconText: {
    color: Colors.c4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: Colors.c15,
    paddingHorizontal: 25,
    marginBottom: 8,
  },
  inputDescription: {
    color: Colors.c5,
    width: 75,
  },
  textInput: {
    height: '100%',
    marginLeft: 20,
    flex: 1,
  },
  shareButton: {
    alignItems: 'center',
    backgroundColor: Colors.c3,
  },
  shareButtonText: {
    color: 'white',
  },
  rowsContainer: {},
});

export default NewPostScreen;
