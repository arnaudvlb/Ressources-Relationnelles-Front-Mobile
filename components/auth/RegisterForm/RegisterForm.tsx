
import { apiRegister } from "@/services/authApi";
import { saveAccessToken } from "@/services/authStorage";
import { saveCurrentUser } from "@/services/userStorage";
import { isEmailValid, isPasswordValid } from "@/utils/validators";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import RegisterAction from "./RegisterAction";
import RegisterFields from "./RegisterFields";
import RegisterHeader from "./RegisterHeader";


type Props=Readonly<{
    styles:any,
    colors:any,
}>




export default function RegisterForm({styles,colors}:Props){


    //Definition des states
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirm,setConfirm]=useState("");
    const [firstname, setFirstname]=useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [phone, setPhone]=useState("");
    const [name,setName]=useState("");
    const [pseudo,setPseudo]=useState("");

    const[loading,setLoading]=useState(false);

    // //Fonction pour simuler l'api 
    // function wait(ms:number){
    //     return new Promise((resolve)=>setTimeout(resolve,ms));
    // }

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


     //Fonction quand l'utilisateur clique pour cree sont compte 
    async function handleRegister() {

      //Nettoyage des variable 

      const cleanEmail = email.trim();
      const cleanPhone=phone.trim();
      const cleanPassword = password.trim();
      const cleanConfirm = confirm.trim();
      const cleanFirstname= firstname.trim();
      const cleanName= name.trim();
      const cleanPseudo=pseudo.trim();
     
      


        //Verification de champs obligatoire 
        if(!cleanEmail||!cleanPseudo.trim()||!cleanPassword ||!cleanConfirm){
            Alert.alert("Oups", "Email, pseudo et mots de passe sont obligatoires.");
            return ;
        }

        //Verification de la confirmation du mdp 
        if(password!==confirm){
            Alert.alert("Oups", "Les mots de passe ne correspondent pas.");
            return;
             
        }

        //Verification taille mdp 
        if(!isPasswordValid(cleanPassword)){
            Alert.alert("Oups", "Le mot de passe doit faire au moins 6 caractères.");
            return;
        }

        if (!isEmailValid(cleanEmail)){
            Alert.alert("Oups", "Le format de l'email n'est pas valide.");
            return;
        }

        //Creation du compte
       try {
            setLoading(true);

            const payload = {
                nom: cleanName,
                prenom: cleanFirstname,
                telephone: cleanPhone ? cleanPhone : null,
                email: cleanEmail,
                pseudo: cleanPseudo,
                motDePasse: cleanPassword,
                photo_profil: avatar,
            };

            console.log("Payload register envoyé :", payload);

            const response = await apiRegister(payload);

            console.log("Réponse register :", response);

            const token =
                response?.data?.token ??
                null;

            const user =
                response?.data?.user ??
                null;

            if (!token) {
                throw new Error("Token non reçu après l'inscription.");
            }

            if (!user) {
                throw new Error("Utilisateur non reçu après l'inscription.");
            }

            await saveAccessToken(token);
            await saveCurrentUser(user);

            Alert.alert("Compte créé ✅", "Tu es connecté(e) !");

            router.replace("/(tabs)");
            } catch (e: any) {
            console.log("Erreur register :", e);

            Alert.alert(
                "Erreur",
                e?.message ?? "Une erreur est survenue lors de la création du compte."
            );
            } finally {
            setLoading(false);
            }
    }

    
    //Interface utilisateur 
    return (
       <>
          <RegisterHeader
            styles={styles}
            title="Inscription"
            subtitle="Crée ton compte. Pour l’instant c’est simulé, mais l’écran est prêt pour brancher l’API."
            >
         </RegisterHeader>
         
          <View style={styles.card}>
              <RegisterFields
              styles={styles}
              sectionTitle="Infos du Compte"
              email={email} 
              setEmail={setEmail}
              pseudo={pseudo}
              setPseudo={setPseudo}
              password={password}
              setPassword={setPassword}
              confirm ={confirm}
              setConfirm={setConfirm}
              firstname={firstname}
              setFirstname={setFirstname}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              >

              </RegisterFields>
            
              
              <RegisterAction
              styles={styles}
              handleAction={handleRegister}
              loading={loading}
              buttonPrimaryText="Créer mon compte"
              linkText="J’ai déjà un compte"
              >


              </RegisterAction>
              

          </View>

       </>
       
  )

}
