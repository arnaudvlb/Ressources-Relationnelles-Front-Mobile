

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { getUserId } from "@/config/format";
import { apiUpdateUserProfile } from "@/services/authApi";
import { doLogout, getCurrentUser, saveCurrentUser } from "@/services/userStorage";
import { User } from "@/types/users";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeProfileStyles } from "./module.profil.style";
import ProfilEditing from "./ProfilEditing";
import ProfilEmpty from "./ProfilEmpty";
import ProfilFields from "./ProfilFields";
import ProfilLoading from "./ProfilLoading";

export default function ProfilForm() {

  // Définition du thème
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeProfileStyles(colors);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mode modification
  const [isEditing, setIsEditing] = useState(false);

  // Champs du formulaire
  const [pseudo, setPseudo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  // Chargement de l'utilisateur connecté
  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();

      if (u) {
        setUser(u);
        fillForm(u);
      }

      setLoading(false);
    })();
  }, []);

  // Remplit le formulaire avec les informations de l'utilisateur
  function fillForm(u: User) {
    setPseudo(u.pseudo ?? "");
    setNom(u.nom ?? "");
    setPrenom(u.prenom ?? "");
    setEmail(u.email ?? "");
    setTelephone(u.telephone ?? "");
  }



  // Annule la modification et remet les anciennes données
  function handleCancelEdit() {
    if (!user) return;

    fillForm(user);
    setIsEditing(false);
  }

  // Enregistre les modifications du profil
  async function handleSaveProfile() {
    if (!user) return;

    if (!pseudo.trim() || !email.trim()) {
      Alert.alert("Champs obligatoires", "Le pseudo et l'email sont obligatoires.");
      return;
    }

    const idUser = getUserId(user);
    if(!idUser) {
      Alert.alert("Probeme utilisateur", "Impossible de récupérer l'identifiant de l'utilisateur.");
      return;
    }
    try {
      setSaving(true);



      const updatedUser = await apiUpdateUserProfile( idUser  , {
        pseudo: pseudo.trim(),
        nom: nom.trim(),
        prenom: prenom.trim(),
        email: email.trim(),
        telephone: telephone.trim(),
      });

      setUser(updatedUser);
      await saveCurrentUser(updatedUser);

      setIsEditing(false);

      Alert.alert("Profil modifié", "Tes informations ont bien été mises à jour.");
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erreur",
        "Impossible de modifier le profil pour le moment."
      );
    } finally {
      setSaving(false);
    }
  }

  // Fonction du bouton de déconnexion
  function handleLogout() {
    Alert.alert("Déconnexion", "Tu veux vraiment te déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          await doLogout();
          router.replace("/(public)/login");
        },
      },
    ]);
  }

  // Affichage pendant le chargement
  if (loading) {
    return (
      <ProfilLoading
      styles={styles}/>
    );
  }

  // Si aucun utilisateur n'est connecté
  if (!user) {
    return (
     <ProfilEmpty 
     styles={styles}/>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mon compte</Text>

        <View style={styles.card}>
          {user.photo_profil ? (
            <Image source={{ uri: user.photo_profil }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user.pseudo?.charAt(0)?.toUpperCase() ?? "U"}
              </Text>
            </View>
          )}

          <Text style={styles.profileName}>@{user.pseudo}</Text>

          <Text style={styles.profileSubtitle}>
            Gérez vos informations personnelles et votre compte.
          </Text>

          {!isEditing ? (
            <ProfilEditing
            styles={styles}
            user={user}
            setIsEditing={setIsEditing}/>
            
          ) : (
           <ProfilFields
                styles={styles}
                colors={colors}
                pseudo={pseudo}
                setPseudo={setPseudo}
                prenom={prenom}
                setPrenom={setPrenom}
                nom={nom}
                setNom={setNom}
                email={email}
                setEmail={setEmail}
                telephone={telephone}
                setTelephone={setTelephone}
                saving={saving}
                handleCancelEdit={handleCancelEdit}
                handleSaveProfile={handleSaveProfile}
                />
          )}

          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}