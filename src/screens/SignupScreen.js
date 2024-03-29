import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../api/api';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFirstName = text => {
    setFirstName(text);
  };

  const handleLastName = text => {
    setLastName(text);
  };

  const handleContactNumber = text => {
    setContactNumber(text);
  };

  const handleEmail = text => {
    setEmail(text);
  };

  const handlePassword = text => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!firstName || !lastName || !contactNumber || !email || !password) {
        showAlert('Validation Error', 'Please fill in all fields.');
        return;
      }

      const response = await fetch(`${BASE_URL}/account/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;

        if (token) {
          await AsyncStorage.setItem('token', token);
          setFirstName('');
          setLastName('');
          setContactNumber('');
          setEmail('');
          setPassword('');
          navigation.navigate('LoginStack');
        } else {
          showAlert(
            'Oops, an Error',
            'An error occurred. Please try again later.',
          );
        }
      } else {
        if (responseData.error) {
          showAlert('Error', responseData.error);
        } else {
          showAlert(
            'Oops, an Error',
            'An error occurred. Please try again later.',
          );
        }
      }
    } catch (error) {
      showAlert('Oops, an Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.logoSection}>
          <Text style={styles.register}>Register your account</Text>
        </View>
        <View style={styles.contactUsForm}>
          <TextInput
            placeholder="First Name *"
            style={styles.input}
            selectionColor="#183153"
            value={firstName}
            onChangeText={handleFirstName}
          />
          <TextInput
            placeholder="Last Name *"
            style={styles.input}
            selectionColor="#183153"
            value={lastName}
            onChangeText={handleLastName}
          />
          <TextInput
            placeholder="Contact Number *"
            keyboardType="numeric"
            style={styles.input}
            selectionColor="#183153"
            value={contactNumber}
            onChangeText={handleContactNumber}
          />
          <TextInput
            placeholder="E-mail *"
            style={styles.input}
            selectionColor="#183153"
            value={email}
            onChangeText={handleEmail}
          />
          <TextInput
            placeholder="Enter your password *"
            style={styles.input}
            selectionColor="#183153"
            value={password}
            onChangeText={handlePassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          <View style={styles.signInSection}>
            <Text style={styles.signInSectionText}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginStack')}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  register: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
    color: '#000',
  },
  contactUsForm: {
    borderWidth: 1,
    borderColor: '#E9EBEC',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 45,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#E9EBEC',
    backgroundColor: '#E9EBEC',
  },
  button: {
    backgroundColor: '#007036',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInSectionText: {
    color: '#000',
    fontSize: 16,
  },
  signInButtonText: {
    color: '#007036',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen;
