import { Stack } from 'expo-router';

export default function InsightsLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen 
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trend"
        options={{
          headerTitle: 'Trend Analysis',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#7c3aed',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="heart-rate"
        options={{
          headerTitle: 'Heart Rate Analysis',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#e11d48',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}