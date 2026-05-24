import { formatDate } from "@/config/format"
import { Message } from "@/types/messages"
import { Text, View } from "react-native"

type Props = {
    styles : any ,  
    message : Message,
    isMine : boolean
}
export default function MessageDetailItem({styles,message,isMine}:Readonly<Props>){

    return(

         <View
            key={message.id}
            style={[
            styles.messageRow,
            isMine ? styles.myMessageRow : styles.otherMessageRow,
            ]}
        >
            <View
            style={[
                styles.messageBubble,
                isMine ? styles.myMessageBubble : styles.otherMessageBubble,
            ]}
            >
            <Text style={styles.messageText}>{message.contenu}</Text>

            <Text style={styles.messageDate}>
                {formatDate(message.dateEnvoi)}
            </Text>
            </View>
        </View>
    )
}