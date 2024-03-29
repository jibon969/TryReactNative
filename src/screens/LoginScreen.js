import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../api/api';
import {useAuth} from '../contexts/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // const {setUserContext} = useAuth();

  const handleLogin = async () => {
    setIsSubmitting(true);
    setLoadingMessage('Signing In...'); // Update loading message

    try {
      const response = await fetch(`${BASE_URL}/account/api/sign-in/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const {token, ...userData} = data;

        await AsyncStorage.setItem('token', token);
        // setUserContext(userData);
        navigation.navigate('HomeStack');
      } else {
        const errorResponse = await response.json(); // Parse error response
        const errorMessage = errorResponse?.message || 'Login failed'; // Get error message from response, or use a default message
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setLoadingMessage(''); // Reset loading message
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.logoSection}>
          {/* Your logo or branding image */}
        </View>
        <View style={styles.contactUsForm}>
          <TextInput
            placeholder="Enter your E-mail"
            style={styles.input}
            selectionColor="#183153"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            selectionColor="#183153"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.styleRegisterBtn}>
            <TouchableOpacity onPress={handleLogin} disabled={isSubmitting}>
              <Text style={styles.sendMessage}>
                {isSubmitting ? 'Signing In...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.styleLoginBtn}>
            <Text style={styles.loginText}>Don't have an account yet ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupStack')}>
              <Text style={styles.signInBtn}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity style={styles.facebookContainer}>
            <Text style={styles.facebookText}>Login with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gmailBtn}>
            <Text style={styles.gmailText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* Loading indicator */}
        {isSubmitting && (
          <ActivityIndicator
            size="large"
            color="#FFF"
            style={styles.loadingIndicator}
          />
        )}
        {/* Loading message */}
        {loadingMessage !== '' && (
          <Text style={styles.loadingMessage}>{loadingMessage}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#183153',
    color: '#FFF',
    padding: 10,
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactUsForm: {
    borderWidth: 1,
    borderColor: '#E9EBEC',
    borderRadius: 10,
    padding: 5,
  },
  input: {
    height: 45,
    margin: 8,
    padding: 10,
    borderRadius: 5,
    borderColor: '#E9EBEC',
    backgroundColor: '#E9EBEC',
  },
  styleRegisterBtn: {
    borderRadius: 10,
    padding: 10,
  },
  sendMessage: {
    padding: 10,
    backgroundColor: '#FFF',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
  },
  styleLoginBtn: {
    margin: 20,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  signInBtn: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#FFF',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    width: 100,
    alignSelf: 'center',
  },
  facebookContainer: {
    marginTop: 10,
    backgroundColor: '#4267B2', // Facebook blue color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gmailBtn: {
    marginTop: 10,
    backgroundColor: '#D44638', // Facebook blue color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gmailText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    margin: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  loadingMessage: {
    textAlign: 'center',
    color: '#FFF',
    marginTop: 10,
  },
});

export default LoginScreen;
