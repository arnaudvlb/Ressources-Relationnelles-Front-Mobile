import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props={
    styles:any,
    handleAction: any,
    loading:boolean,
    buttonPrimaryText:string,
    linkText:string,
}

export default function RegisterAction({styles, handleAction,loading, buttonPrimaryText,linkText}:Props){

    return(
        <>
         <Pressable
              onPress={handleAction}
              style={[styles.buttonPrimary, loading ? { opacity: 0.7 } : null]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonPrimaryText}>{buttonPrimaryText}Créer mon compte</Text>
              )}
            </Pressable>

            {/* Lien retour */}
            <Pressable onPress={() => router.push("/login")} disabled={loading}>
              <Text style={styles.link}>{linkText}J’ai déjà un compte</Text>
            </Pressable>
        </>
    )
}