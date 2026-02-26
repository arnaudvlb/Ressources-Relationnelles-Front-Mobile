import { Image, Linking, Pressable, Text, View } from "react-native";


type Props={
    styles:any, 
    colors:any,
    medias:any,


}

 function isImage(url:string){
        return /\.(png|jpg|jpeg|webp)$/i.test(url);
    }

function isPDF(url:string){
        return /\.pdf$/i.test(url);
    }


export default function RessourceMedia({styles,colors,medias}:Props){
    return(
        <>
         <View style={styles.card}>
            <Text style={styles.metaText}>Médias</Text>
                {medias.taille === 0 ?(
                    <Text style={styles.empty}>Aucun média pour cette ressource</Text>
                    ):(
                        <View style={{gap:12}}>
                            {medias.map((m:any)=>{
                                            
                            const url = String(m.chemin_fichier ??"");
                            const name=String(m.nom_fichier ??"Fichier");
        
                            if (url && isImage(url)){
                                return(
                                    <View key={String(m.id_media)} style={{gap:8}}>
                                        <Text style={styles.metaText}>{name}</Text>
                                        <Image
                                            source={{ uri: url }}
                                            style={{ width: "100%", height: 220, borderRadius: 18 }}
                                            resizeMode="cover"
                                        />
        
                                    </View>
                                    );
                            }
                            if(url){
                                return(
                                    <View key={String(m.id_media)} style ={{gap:8}}>
                                        <Text style={styles.metaText}>{name}</Text>
                                        <Pressable
                                            onPress={()=>Linking.openURL(url)}
                                            style={[styles.button,{backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}>
                                                            
                                                            <Text style={[styles.buttonText,{color:colors.text}]}>
                                                                {isPDF(url)?"Ouvrir le PDF" : "Ouvrir le lien"}
                                                            </Text>
                                                        </Pressable>
                                                    </View>
                                                )
                                            }
                                            return(
                                                <Text key={String(m.id_media)} style={styles.empty}>
                                                    Média Invalide
                                                </Text>
                                            );
                                        })}
                                    </View>
                                )}
                            </View>
        </>
    )
}