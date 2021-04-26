import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import API from '../../axios/api';

const MessengerScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.ar.token);

  useEffect(() => {
    API.get('/conversations/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          // keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item.name}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MessengerScreen;
