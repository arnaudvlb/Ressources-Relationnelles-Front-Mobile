import { AppInput } from "@/components/AppInput";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeLoginStyles } from "@/styles/loginStyles";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";


export default function Login(){

    //Gestion du theme
    const scheme=useColorScheme()??"dark";
    const colors= Colors[scheme];
    const styles = makeLoginStyles(colors);

    //Etat de stockage des infos utilisateurs$
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    //Quand l'utilisateur appuie sur le bouton pour se connecter
    function handleLogin(){

        //Verifie si email ou mot de passe vide
        if(!email.trim() || !password.trim()){

            Alert.alert("Oups","l'email et le mots de passe sont obligatoires.")
            return;
        }


        //Connexion a l'api 

        //Simuler pour reussite
        router.replace("/(tabs)")
    }

    //Affichage du composant 
    return (

         <View style={styles.screen}>

         <Text style={styles.title}>Connexion</Text>
         <Text style={styles.subtitle}>Renseignez vos identifiaant pour accéder à l'application</Text>
         
         
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

            <Pressable onPress={()=>router.push("/register")}>
                <Text style={styles.link}>Créer un Compte</Text>
            </Pressable>


         </View>

         </View>

    )

}