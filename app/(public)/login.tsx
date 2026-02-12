import { AppInput } from "@/components/AppInput";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { saveAccessToken } from "@/services/authStorage";
import { saveCurrentUser } from "@/services/userStorage";
import { makeLoginStyles } from "@/styles/loginStyles";
import { Role } from "@/types/roles";
import { User } from "@/types/users";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login(){

    //Gestion du theme
    const scheme=useColorScheme()??"dark";
    const colors= Colors[scheme];
    const styles = makeLoginStyles(colors);

    //Etat de stockage des infos utilisateurs$
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    function getRoleFromEmail(cleanEmail: string): Role {
  if (cleanEmail === "super@test.com") return "ROLE_SUPER_ADMIN";
  if (cleanEmail === "admin@test.com") return "ROLE_ADMIN";
  if (cleanEmail === "modo@test.com") return "ROLE_MODERATEUR";
  return "ROLE_USER";
}

    // Fonction utilitaire : validation simple du format email
    function isEmailValid(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

    //Quand l'utilisateur appuie sur le bouton pour se connecter
      async function handleLogin() {
     // Nettoyage des data
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

         // Vérifie si l’email ou le mot de passe est vide
     if (!cleanEmail || !cleanPassword) {
      Alert.alert("Oups", "L'email et le mot de passe sont obligatoires.");
      return;
    }

    // Vérifie si le format de l’email est valide
    if (!isEmailValid(cleanEmail)) {
      Alert.alert("Oups", "Le format de l'email n'est pas valide.");
      return;
    }

    // Ici, plus tard, tu feras l’appel API (POST /login)
    // Pour l’instant, on simule une réussite

    // Création d’un token mock
    const fakeToken = `mock_${Date.now()}`;

    // Détermination du rôle (mock)
    const role = getRoleFromEmail(cleanEmail);

    // Détermination du statut du compte (mock)
    const statut_compte: "ACTIF" | "DESACTIVE" | "BLOQUE" = "ACTIF";

    // Si le compte n’est pas actif, on bloque la connexion
    if (statut_compte !== "ACTIF") {
      Alert.alert(
        "Compte indisponible",
        "Ce compte est désactivé ou bloqué. Contacte un administrateur."
      );
      return;
    }

    // Construction d’un user aligné BDD (mock)
    const user: User = {
      id_utilisateur: 1,
      nom: "Dupont",
      prenom: "Test",
      telephone: null,
      email: cleanEmail,
      pseudo: cleanEmail.split("@")[0],
      photo_profil: null,
      statut_compte,
      date_creation: new Date().toISOString(),
      role,
    };

    // Sauvegarde du token en local
    await saveAccessToken(fakeToken);

    // Sauvegarde du user courant en local
    await saveCurrentUser(user);

    // Message de succès
    Alert.alert("Connexion ✅", "Tu es connecté(e) !");

    // Navigation vers l’espace privé
    router.replace("/(tabs)");
  }
    //Affichage du composant 
   return (
    // SafeAreaView pour ne pas être coupé par la barre du haut
    <SafeAreaView style={styles.screen}>
     
      <Text style={styles.title}>Connexion</Text>

     
      <Text style={styles.subtitle}>
        Renseignez vos identifiants pour accéder à l'application
      </Text>

    
      <View style={styles.card}>
      
        <AppInput
          label="Email"
          placeholder="bonjour@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

       
        <AppInput
          label="Mot de passe"
          placeholder="•••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

       
        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.link}>Créer un compte</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}