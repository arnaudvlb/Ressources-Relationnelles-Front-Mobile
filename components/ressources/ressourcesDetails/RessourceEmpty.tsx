import { router } from "expo-router";
import { Pressable, Text } from "react-native";

type Props={
    styles:any,
    title:string,
    empty:string,
    buttonText:string,
}


export default function RessourceEmpty({styles,title,empty,buttonText}:Readonly<Props>){
    return(
        <>
         <Text style={styles.title}>{title}</Text>
        <Text style={styles.empty}>{empty}</Text>
        
        <Pressable onPress={()=> router.back()} style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
        </>
    )
}