// src/App.js - Simplified version
import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user: authUser, loading: authLoading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
          setEmail(userData.email);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setEmail('');
      setPassword('');
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const data = await register(email, password, 'Test', 'User');
      Alert.alert('Success', 'Registered successfully!');
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button 
            title={loading ? 'Logging in...' : 'Login'} 
            onPress={() => handleLogin(email, password)} 
            disabled={loading}
          />
          <Button 
            title="Register" 
            onPress={() => handleRegister(email, password, 'Test', 'User')} 
            disabled={loading}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Welcome, {user.firstName}!</Text>
          <Button 
            title="Logout" 
            onPress={handleLogout} 
            disabled={loading}
          />
        </>
      )}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  }
});