import { router } from "expo-router"
import { ActivityIndicator, Pressable, Text, View } from "react-native"



type Props={
    styles:any,
    handleAction:any,
    buttonTextLogin: string,
    buttonTextAccount:string,
    loading: boolean,
}

export default function LoginAction({styles,handleAction, buttonTextLogin, buttonTextAccount,loading}:Readonly<Props>){
    return (
        
        <View style={styles.actions}>
        <Pressable
          onPress={handleAction}
          style={[styles.button, loading ? { opacity: 0.7 } : null]}
          disabled={loading}
        >
          {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>{buttonTextLogin}</Text>}
        </Pressable>

        <Text style={styles.helper}>Démo mobile</Text>

        <Pressable onPress={() => router.push("/register")} disabled={loading}>
          <Text style={styles.link}>{buttonTextAccount}</Text>
        </Pressable>
      </View>
        
    )
}