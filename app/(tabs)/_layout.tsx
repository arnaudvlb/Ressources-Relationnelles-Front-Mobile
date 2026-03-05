
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

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

           <Tabs.Screen
             name="ressources/index"
             options={{
               title: "Ressources",
               tabBarIcon: ({ color, size }) => (
                 <Ionicons name="book" size={size ?? 28} color={color} />
               ),
             }}
     />
     
         <Tabs.Screen
             name="ressources/[id]"
             options={{
               href: null,
             }}
         />
        

      {/* Onglet Compte */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Compte",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />

      
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );

}