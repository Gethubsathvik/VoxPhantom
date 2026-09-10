// components/Navbar.tsx - Updated to show VoxPhantom branding
import { View, Text, StyleSheet } from 'react-native';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>VoxPhantom</Text>
      <Text style={styles.subtitle}>Make free international calls</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
  },
});