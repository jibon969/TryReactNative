import {StyleSheet, Text, View} from 'react-native';
import SetGetRemove from './src/Learn/AsyncStorage/SetGetRemove';

const App = () => {
  return (
    <View style={styles.container}>
      <SetGetRemove />
    </View>
  );
};

export default App;

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
});
