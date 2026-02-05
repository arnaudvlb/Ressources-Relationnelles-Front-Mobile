
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function PublicTabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{

        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    
        headerShown: false,
      }}
    >
      {/* Onglet Accueil public (Bienvenue) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Onglet Connexion (public) */}
      <Tabs.Screen
        name="login"
        options={{
          title: "Connexion",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size ?? 28} color={color} />
          ),
        }}
      />

        <Tabs.Screen
            name="register"
            options={{
                href: null, // cache complètement l’onglet
            }}
            />
    </Tabs>
  );
}
