
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";

export default function MainTabsLayout() {

  // Récupération du thème actuel (light ou dark)
  const colorScheme = useColorScheme();

  return (
     <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      {/* Onglet Accueil */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Onglet Compte */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Compte",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />

      {/* Cache Explore si le fichier existe encore */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />

      {/* Cache la route admin/users (sous-dossier admin) */}
      <Tabs.Screen
        name="admin/users"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );

}