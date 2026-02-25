import { saveAccessToken } from "@/services/authStorage";
import { saveCurrentUser } from "@/services/userStorage";
import { isEmailValid, isPasswordValid } from "@/utils/validators";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import LoginAction from "./LoginAction";
import { LoginFields } from "./LoginFields";
import LoginHeader from "./LoginHeader";
import { LoginMessage } from "./LoginMessage";

type Props = {
  styles: any;
};

export default function LoginForm({ styles }: Props) {
  // État des champs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // État UI (comme le repo web)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Soumission (équivalent onSubmit)
  const handleLogin = useCallback(async () => {
    // Reset message au début
    setMessage(null);

    // Lock UI
    setLoading(true);

    // Clean inputs
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Validations
    if (!cleanEmail || !cleanPassword) {
      setLoading(false);
      setMessage("Email et mot de passe obligatoires.");
      return;
    }

    if (!isEmailValid(cleanEmail)) {
      setLoading(false);
      setMessage("Format d'email invalide.");
      return;
    }

    if (!isPasswordValid(cleanPassword)) {
      setLoading(false);
      setMessage("Mot de passe trop court (min 8).");
      return;
    }


    try {
      // Démo : remplaçable par l'API
      const result = await mockLogin(cleanEmail, cleanPassword);

      if (!result.ok) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      // Stockage local
      await saveAccessToken(result.token);
      await saveCurrentUser(result.user);

      setLoading(false);

      // Message succès 
      setMessage("Connexion OK ✅");

      // Redirection
      router.replace("/(tabs)");
    } catch (e: any) {
      setLoading(false);
      setMessage(e?.message ?? "Erreur inconnue.");
    }
  }, [email, password]);

  return (
    <>
    <LoginHeader 
      styles={styles}
      title="Connexion"
      subtitle="Accède à ton feed, tes groupes et tes ressources partagées.">
        
      </LoginHeader>

     <LoginMessage 
        styles={styles}
        message={message}>

     </LoginMessage>

     <LoginFields
        styles={styles}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      >

     </LoginFields>

     <LoginAction
        styles={styles}
        handleAction={handleLogin}
        buttonTextLogin="Se connecter"
        buttonTextAccount="Crée un compte"
        loading={loading}
        
     >


     </LoginAction>

  </>
  );
}