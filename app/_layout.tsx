import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {

  return (
  <SafeAreaProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="ressources/index" options={{ headerShown: false }} />
      <Stack.Screen name="ressources/[id]" options={{ headerShown: false }} />
    </Stack>
  </SafeAreaProvider>
);
}