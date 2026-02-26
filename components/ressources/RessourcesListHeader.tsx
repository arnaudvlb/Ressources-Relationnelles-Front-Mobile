import { Text } from "react-native";

type Props={
    styles:any,
    title:string,
    subtitle:string,
}

export default function RessourcesListHeader({styles,title,subtitle}: Props){
    return(
        <>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle} </Text>
        </>
    )
}