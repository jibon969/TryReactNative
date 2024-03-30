import {StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import Home from '../../src/components/Home/Home';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.contactArea}>
      <Home navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <Text />
      <Text />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contactArea: {
    flex: 1,
  },
});

export default HomeScreen;
