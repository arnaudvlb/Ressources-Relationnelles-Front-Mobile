import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";
import { Text, View } from "react-native";


type Props = {
    styles : any , 
    otherUser : UserAPI |User, 
}

export default function MessageDetailEmpty({styles,otherUser}:Readonly<Props>){

    return(
        <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Aucun message</Text>

            <Text style={styles.muted}>
            Commencez la conversation avec @{otherUser.pseudo}.
            </Text>
        </View>
    )
}