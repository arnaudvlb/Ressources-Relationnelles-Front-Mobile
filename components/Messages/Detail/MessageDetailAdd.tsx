
import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type Props = {
    styles : any ,  
    messageText :string,
    setMessageText : Dispatch<SetStateAction<string>>,
    colors :any, 
    handleSendMessage : () => Promise<void>;
}


export default function MessageDetailAdd({styles,messageText,setMessageText,colors,handleSendMessage}:Readonly<Props>){


    return(
        <View style={styles.inputContainer}>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Écrire un message..."
            placeholderTextColor={colors.muted}
            style={styles.input}
            multiline
          />

          <Pressable
            onPress={handleSendMessage}
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.sendButtonPressed,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            disabled={!messageText.trim()}
          >
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </Pressable>
        </View>
    )
}