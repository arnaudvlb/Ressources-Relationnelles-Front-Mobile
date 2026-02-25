import { Text, View } from "react-native";

type Props ={
    styles:any, 
    message : string| null,
}

export function LoginMessage({styles,message}:Props){

    return (
        <>
        {message ? (
                <View style={message.startsWith("Connexion OK") ? styles.successBox : styles.errorBox}>
                  <Text style={message.startsWith("Connexion OK") ? styles.successText : styles.errorText}>
                    {message}
                  </Text>
                </View>
              ) : null
            }
    
    </>
    )
}