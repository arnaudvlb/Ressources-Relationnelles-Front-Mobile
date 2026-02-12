import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { removeAccessToken } from "@/services/authStorage";
import { getCurrentUser, removeCurrentUser } from "@/services/userStorage";
import { makeProfileStyles } from "@/styles/profileStyles";
import { User } from "@/types/users";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function Profile()  {

    //Definition du theme
    const scheme = useColorScheme()?? "dark";
    const colors = Colors[scheme];
    const styles = makeProfileStyles(colors);


    const [user,setUser]=useState<User |null>(null);
    const [loading,setLoading]=useState(true);

    //Charger l'utilisateur 
    useEffect(()=>{
      (async ()=>{
        const u = await getCurrentUser();
        
        setUser(u);
        setLoading(false);
      })();
    },[]);

    //Droit d'accession au backOffice
    const canAccessAdmin = 
        user?.role === "ROLE_MODERATEUR" ||
        user?.role === "ROLE_ADMIN" ||
        user?.role === "ROLE_SUPER_ADMIN";


    //Formatage de la date
    function formatDate(iso : string |undefined){
      if(!iso) return "-";

      const d= new Date(iso);
      
      if (isNaN(d.getTime())) return iso 

      return d.toLocaleDateString("fr-FR")
    }

    //Fonction de deconnexion
    async function doLogout() {

        //Supprimer le token d'acces
        await removeAccessToken();
        await removeCurrentUser();

        //Redirection sur la page de login
        router.replace("/login");
        
    }

    //Fonction bouton deconnexion
    function handleLogout(){

   // Demande confirmation
    Alert.alert("Déconnexion", "Tu veux vraiment te déconnecter ?", [
      // Bouton annuler
      { text: "Annuler", style: "cancel" },

      // Bouton confirmer
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          // Supprime le token
          await removeAccessToken();

          // Supprime l’utilisateur courant
          await removeCurrentUser();

          // Retour vers la zone publique (accueil public)
          router.replace("/(public)");
        },
      },
    ]);
  }

  // Si on charge encore, on affiche un mini placeholder simple
  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Mon compte</Text>
        <Text style={styles.muted}>Chargement…</Text>
      </SafeAreaView>
    );
  }

  // Si aucun user n’est stocké, on propose d’aller se connecter
  if (!user) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Mon compte</Text>

        <View style={styles.card}>
          <Text style={styles.muted}>
            Aucun utilisateur connecté. Connecte-toi pour accéder à ton profil.
          </Text>

          <Pressable
            onPress={() => router.replace("/(public)/login")}
            style={styles.adminButton}
          >
            <Text style={styles.adminText}>Aller à la connexion</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Mon compte</Text>

      <View style={styles.card}>
        {user.photo_profil ? (
          <Image
            source={{ uri: user.photo_profil }}
            style={{ width: 92, height: 92, borderRadius: 18 }}
          />
        ) : null}

        <Text style={styles.muted}>Pseudo</Text>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "900" }}>
          @{user.pseudo}
        </Text>

        <Text style={styles.muted}>Nom / Prénom</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "800" }}>
          {(user.prenom || "-") + " " + (user.nom || "")}
        </Text>

        <Text style={styles.muted}>Email</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
          {user.email}
        </Text>

        <Text style={styles.muted}>Téléphone</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
          {user.telephone ?? "-"}
        </Text>

        <Text style={styles.muted}>Statut du compte</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "800" }}>
          {user.statut_compte}
        </Text>

        <Text style={styles.muted}>Rôle</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "800" }}>
          {user.role}
        </Text>

        <Text style={styles.muted}>Membre depuis</Text>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
          {formatDate(user.date_creation)}
        </Text>

        {canAccessAdmin ? (
          <Pressable
            onPress={() => router.push("/admin/users")}
            style={styles.adminButton}
          >
            <Text style={styles.adminText}>Gestion des utilisateurs</Text>
          </Pressable>
        ) : null}

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}