// src/services/apiService.js
export const API_URL = 'http://localhost:3000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Login failed');
  }
  
  return data;
};

export const register = async (email, password, firstName, lastName) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
    credentials: 'include',
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Registration failed');
  }
  
  return data;
};

export const getUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error('Unauthorized');
  }
  
  return data.data.user;
};

export const initiateCall = async (recipientNumber, country = 'US') => {
  const response = await fetch(`${API_URL}/calls/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipientNumber, country }),
    credentials: 'include',
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Call initiation failed');
  }
  
  return data.data;
};

export const refreshToken = async () => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error('Token refresh failed');
  }
  
  return data;
};