
import { saveAccessToken } from "@/services/authStorage";
import { saveCurrentUser } from "@/services/userStorage";
import { User } from "@/types/users";
import { isEmailValid, isPasswordValid } from "@/utils/validators";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import RegisterAction from "./RegisterAction";
import { RegisterAvatar } from "./RegisterAvatar";
import RegisterFields from "./RegisterFields";
import RegisterHeader from "./RegisterHeader";


type Props={
    styles:any,
    colors:any,
}




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
                nom: cleanName,
                prenom: cleanFirstname,
                telephone: cleanPhone? cleanPhone : null,
                email: cleanEmail,
                pseudo: cleanPseudo,
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
              
              <RegisterAvatar
              styles={styles}
              colors={colors}
              sectionTitle="Photo de profil"
              avatar={avatar}
              handleAction={pickAvatar}
              loading={loading}
              
              >


              </RegisterAvatar>
              
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
