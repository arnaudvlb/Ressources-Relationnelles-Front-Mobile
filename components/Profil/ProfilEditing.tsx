import { formatDate } from "@/config/format"
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

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Statut du compte</Text>
            <Text style={styles.value}>{user.statut_compte}</Text>
            </View>

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Rôle</Text>
            <Text style={styles.value}>{user.role}</Text>
            </View>

            <View style={styles.infoGroup}>
            <Text style={styles.label}>Membre depuis</Text>
            <Text style={styles.value}>{formatDate(user.date_creation)}</Text>
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