// src/screens/LoginScreen.js - Updated to show VoxPhantom branding
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const { handleLogin, handleRegister, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VoxPhantom</Text>
      
      {!loading && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
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
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  }
});