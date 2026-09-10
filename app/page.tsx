// app/page.tsx - Updated to show VoxPhantom branding
import { View, Text, StyleSheet } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VoxPhantom</Text>
      <Text style={styles.subtitle}>Make free international calls</Text>
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
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  }
});