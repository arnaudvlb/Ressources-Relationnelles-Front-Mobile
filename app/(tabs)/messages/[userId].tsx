import MessageDetail from "@/components/Messages/Detail/MessageDetail";
import { useLocalSearchParams } from "expo-router";


export default function MessageDetailScreen(){
    const { userId } = useLocalSearchParams<{ userId: string }>();
    return(

        <MessageDetail userId={userId}/>
    )
}