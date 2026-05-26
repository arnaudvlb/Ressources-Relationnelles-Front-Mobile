import { User } from "@/types/users"
import { Pressable, Text, View } from "react-native"


type Props = {
    styles : any, 
    user: User,
    setIsEditing: (value: boolean) => void,


}

export default function ProfilEditing({styles,user,setIsEditing}:Readonly<Props>){

    return(
        <>
            <View style={styles.infoGroup}>
            <Text style={styles.label}>Pseudo</Text>
            <Text style={styles.value}>@{user.pseudo}</Text>
            </View>

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Nom / Prénom</Text>
            <Text style={styles.value}>
                {(user.prenom || "-") + " " + (user.nom || "")}
            </Text>
            </View>

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{user.telephone ?? "-"}</Text>
            </View>



            <Pressable
            onPress={() => setIsEditing(true)}
            style={styles.primaryButton}
            >
            <Text style={styles.primaryButtonText}>Modifier mon profil</Text>
            </Pressable>
        </>
    )
}