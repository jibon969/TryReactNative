import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetGetRemoveData = () => {
  const [user, setUser] = useState('');

  const setData = async () => {
    // Here is name is key and value is jibon
    await AsyncStorage.setItem('name', 'jibon');
  };

  const getData = async () => {
    // // when we get data we can call key property
    const name = await AsyncStorage.getItem('name');
    setUser(name);
    // console.log(name);
  };

  const removeData = async () => {
    // when we remove data we can also call key property
    await AsyncStorage.removeItem('name');
    setUser('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AsyncStorage set, get, remove data</Text>
      <Button title="Set data" onPress={setData} />
      <Text style={styles.text}>Show Data: {user}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Get data" onPress={getData} />
        <View style={styles.buttonGap} />
        <Button title="Remove data" onPress={removeData} />
      </View>
    </View>
  );
};

export default SetGetRemoveData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonGap: {
    width: 10,
  },
});
