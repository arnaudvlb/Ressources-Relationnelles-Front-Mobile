import LoginForm from "@/components/auth/LoginForm/LoginForm";
import { makeLoginStyles } from "@/components/auth/LoginForm/module.loginStyles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login(){

    //Gestion du theme
    const scheme=useColorScheme()??"dark";
    const colors= Colors[scheme];
    const styles = makeLoginStyles(colors);

    //Affichage du composant 
   return (
    <SafeAreaView style={styles.screen}>
    <LoginForm styles= {styles}></LoginForm>
    </SafeAreaView>
  );
}