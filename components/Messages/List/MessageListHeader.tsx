import { Text, View } from "react-native"

type Props = {
    styles : any , 
}


export default function MessgaeListHeader({styles}:Readonly<Props>){

    return(
        <View style={styles.header}>
            <Text style={styles.title}>Messagerie</Text>

            <Text style={styles.subtitle}>
            Retrouvez vos échanges et continuez vos conversations.
            </Text>
        </View>
    )
}