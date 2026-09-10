// app/layout.tsx - Updated to show VoxPhantom branding
import { ReactNode } from 'react';
import { Stack } from 'react-router-dom';
import LoginScreen from '@/pages/Login';
import HomeScreen from '@/pages/Home';
import DashboardScreen from '@/pages/Dashboard';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}