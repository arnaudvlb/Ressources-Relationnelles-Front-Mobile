
import { AppInput } from "@/components/AppInput";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { saveAccessToken } from "@/services/authStorage";
import { makeRegisterStyles } from "@/styles/registerStyles";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";




export default function Register(){

    //Recuperation du theme 
    const scheme = useColorScheme()??"dark";
    const colors=Colors[scheme];
    const styles = makeRegisterStyles(colors);

    //Definition des states
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirm,setConfirm]=useState("");
    const [username, setUsername]=useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [phone, setPhone]=useState("");
    const[name,setName]=useState("");
    const [firstname,setFirstName]=useState("");

    const[loading,setLoading]=useState(false);

    //Fonction pour simuler l'api 
    function wait(ms:number){
        return new Promise((resolve)=>setTimeout(resolve,ms));
    }

    //Fonction quand l'utilisateur clique pour cree sont compte 
    async function handleRegister() {
        //Verification de champs obligatoire 
        if(!email.trim()||!username.trim()||!password.trim() ||!confirm.trim()){
            Alert.alert("Oups", "Email, pseudo et mots de passe sont obligatoires.");
            return ;
        }

        //Verification de la confirmation du mdp 
        if(password!==confirm){
            Alert.alert("Oups", "Les mots de passe ne correspondent pas.");
            return;
             
        }

        //Verification taille mdp 
        if(password.length<6){
            Alert.alert("Oups", "Le mot de passe doit faire au moins 6 caractères.");
            return;
        }

        //Creation du compte
        try{
            setLoading(true);

            //Simultation d'appel
            await wait(900);

            //creation du token 
            const fakeToken=`mock_${Date.now()}`;

            await saveAccessToken(fakeToken);

            Alert.alert("Compte créé ✅", "Tu es connecté(e) !");

            router.replace("/(tabs)");
        }catch(e:any){
            Alert.alert("Erreur", e.message || "Une erreur est survenue.");

        }finally{
            setLoading(false);
        }
        
    }


    //Fonction pour recuperer une image dans la galerie 
    async function pickAvatar() {

        //Permission
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted){
             Alert.alert("Autorisation requise", "Il faut autoriser l'accès à la galerie.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality:0.8,
            
        });

        if(!result.canceled){
            setAvatar(result.assets[0].uri);
        }
        

        
    }

    //Interface utilisateur 
    return (
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS==="ios"?"padding":undefined}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Inscription</Text>
                <Text style={styles.subtitle}>  Crée ton compte. Pour l’instant c’est simulé, mais l’écran est prêt pour brancher l’API.</Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Infos du Compte</Text>
                  <AppInput
            label="Email"
            placeholder="ex: hello@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput
            label="Pseudo"
            placeholder="ex: pommepote"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <AppInput
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <AppInput
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />

          {/* Section informations profil (facultatif) */}
          <Text style={styles.sectionTitle}>Infos profil (optionnel)</Text>

          <AppInput
            label="Prénom"
            placeholder="ex: Pierre"
            value={firstname}
            onChangeText={setFirstName}
          />

          <AppInput
            label="Nom"
            placeholder="ex: Dupont"
            value={name}
            onChangeText={setName}
          />

          <AppInput
            label="Téléphone"
            placeholder="ex: 06 00 00 00 00"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

         <Text style={styles.sectionTitle}>Photo de profil (optionnel)</Text>
         {avatar ? (
            <Image
                source={{ uri: avatar }}
                style={{ width: 96, height: 96, borderRadius: 18, marginBottom: 8 }}
            />
            ) : null}

            <Pressable
            onPress={pickAvatar}
            style={[styles.buttonPrimary, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}
            >
            <Text style={[styles.buttonPrimaryText, { color: colors.text }]}>
                Choisir une photo
            </Text>
            </Pressable>

          <Pressable 
             onPress={handleRegister}
             style={[styles.buttonPrimary,loading?{opacity:0.7}:null]}
             disabled={loading}>
             {loading ? (
                <ActivityIndicator/>
             ):(
                <Text style={styles.buttonPrimaryText}>Créer mon compte</Text>
             )}

          </Pressable>

             <Pressable onPress={() => router.back()} disabled={loading}>
            <Text style={styles.link}>J’ai déjà un compte</Text>
            </Pressable>


                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}