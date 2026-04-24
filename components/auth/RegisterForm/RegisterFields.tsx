import { AppInput } from "@/components/AppInput"
import { Text } from "react-native"

type Props=Readonly<{
    styles:any,
    sectionTitle:string,
    email:string, 
    setEmail: (text: string) => void,
    pseudo:string, 
    setPseudo :(text: string) => void,
    password : string, 
    setPassword:(text: string) => void,
    confirm : string, 
     etConfirm: (text: string) => void,
    firstname: string, 
    setFirstname:(text: string) => void,
    name:string , 
    setName:(text: string) => void,
    phone:string , 
    setPhone:(text: string) => void,
    setConfirm :(text: string) => void,


}>

export default function RegisterFields({styles,sectionTitle,email,setEmail,pseudo,setPseudo,password,setPassword,confirm,setConfirm,firstname,setFirstname,
                                       name,setName,phone,setPhone}:Props){

    return(
        <>

            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
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
                          value={pseudo}
                          onChangeText={setPseudo}
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
            
                        {/* Section profil */}
                        <Text style={styles.sectionTitle}>Infos profil (optionnel)</Text>
            
                        <AppInput
                          label="Prénom"
                          placeholder="ex: Pierre"
                          value={firstname}
                          onChangeText={setFirstname}
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
        
        </>
    )
  
}