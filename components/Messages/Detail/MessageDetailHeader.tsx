import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";



type Props = {
    styles : any , 
    otherUser : UserAPI |User, 
}



export default function MessageDetailHeader({styles,otherUser}:Readonly<Props>){

    return(

        <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
            </Pressable>

            {otherUser.photo_profil ? (
            <Image source={{ uri: otherUser.photo_profil }} style={styles.avatar} />
            ) : (
            <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                {otherUser.pseudo?.charAt(0)?.toUpperCase() ?? "U"}
                </Text>
            </View>
            )}

            <View style={styles.headerInfo}>
            <Text style={styles.pseudo}>@{otherUser.pseudo}</Text>

            <Text style={styles.name}>
                {otherUser.prenom || otherUser.nom
                ? `${otherUser.prenom ?? ""} ${otherUser.nom ?? ""}`.trim()
                : "Utilisateur"}
            </Text>
            </View>
        </View>
    )
}