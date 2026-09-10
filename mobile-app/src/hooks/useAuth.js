// hooks/useAuth.js
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login, register, getUser, refreshToken } from '../services/apiService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a valid token in secure storage
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          // Try to verify the token
          const userData = await getUser();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      await SecureStore.setItemAsync('token', data.data.token);
      await SecureStore.setItemAsync('refreshToken', data.data.refreshToken);
      setUser(data.data.user);
      return true;
    } catch (error) {
      Alert.alert('Error', error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, password, firstName, lastName) => {
    setLoading(true);
    try {
      const data = await register(email, password, firstName, lastName);
      await SecureStore.setItemAsync('token', data.data.token);
      await SecureStore.setItemAsync('refreshToken', data.data.refreshToken);
      setUser(data.data.user);
      return true;
    } catch (error) {
      Alert.alert('Error', error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('refreshToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, loading, handleLogin, handleRegister, handleLogout };
}