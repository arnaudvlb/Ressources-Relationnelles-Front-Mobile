
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import { makeRegisterStyles } from "@/components/auth/RegisterForm/module.RegisterStyles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { saveAccessToken } from "@/services/authStorage";
import { saveCurrentUser } from "@/services/userStorage";
import { User } from "@/types/users";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




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
    const [pseudo,setPseudo]=useState("");

    const[loading,setLoading]=useState(false);

    //Fonction pour simuler l'api 
    function wait(ms:number){
        return new Promise((resolve)=>setTimeout(resolve,ms));
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

    //Test valider de l'email
    function isEmailValid(value : string){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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

        if (!isEmailValid(email.trim())){
            Alert.alert("Oups", "Le format de l'email n'est pas valide.");
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

            //Creation du faux compte user 
            const fakeUserId=Math.floor(Math.random()*10000)+1;
            
            const createadAt = new Date().toISOString();

            const user : User={
                id_utilisateur: fakeUserId,
                nom: name.trim(),
                prenom: username.trim(),
                telephone: phone.trim() ? phone.trim() : null,
                email: email.trim(),
                pseudo: pseudo.trim(),
                photo_profil: avatar,
                statut_compte: true,
                date_creation: createadAt,
                role: "ROLE_USER",
            }
            await saveCurrentUser(user);

            Alert.alert("Compte créé ✅", "Tu es connecté(e) !");

            router.replace("/(tabs)");
        }catch(e:any){
            Alert.alert("Erreur", e.message || "Une erreur est survenue.");

        }finally{
            setLoading(false);
        }
        
    }

    
    //Interface utilisateur 
    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* KeyboardAvoidingView pour pousser le contenu quand le clavier apparaît */}
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ScrollView pour permettre de scroller sur petit écran */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <RegisterForm
          styles={styles}
          colors={colors}
          >
          </RegisterForm>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
    

}