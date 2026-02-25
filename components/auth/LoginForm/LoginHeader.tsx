import { Text, View } from "react-native"


type Props = {
    styles:any,
    title : string,
    subtitle:string,
}

export default function LoginHeader({styles,title,subtitle}: Props){

    return(
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>

    )

}