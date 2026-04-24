import { Image, Pressable, Text } from "react-native";


type Props=Readonly<{
    styles:any,
    colors:any,
    sectionTitle:string,
    avatar:any,
    handleAction:any,
    loading:boolean,


}>

export function RegisterAvatar({styles,colors,sectionTitle,avatar,handleAction,loading}:Props){
    return(
        <>
            <Text style={styles.sectionTitle}>{sectionTitle} (optionnel)</Text>

            {/* Affiche l’aperçu si une image est sélectionnée */}
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={{ width: 96, height: 96, borderRadius: 18, marginBottom: 8 }}
              />
            ) : null}

            {/* Bouton pour choisir une photo */}
            <Pressable
              onPress={handleAction}
              style={[
                styles.buttonPrimary,
                { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
              ]}
              disabled={loading}
            >
              <Text style={[styles.buttonPrimaryText, { color: colors.text }]}>
                Choisir une photo
              </Text>
            </Pressable>
        
        </>
    )
}