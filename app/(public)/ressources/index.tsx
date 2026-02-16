import { Colors } from "@/constants/theme";
import { listRessources } from "@/data/mockRessources";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeResourcesListStyles } from "@/styles/ressourcesListStyles";
import type { Ressource } from "@/types/ressources";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function RessourcesList(){

    const scheme=useColorScheme()??"dark";
    const colors=Colors[scheme];
    const styles=makeResourcesListStyles(colors);

    const ressources=listRessources();

    //Definition des cards de ressources
    function renderItem({item}:{item:Ressource}){

        //Formatage de la date
        const dateText=item.date_creation ? String(item.date_creation).slice(0,10):"-";

        return (
            <Pressable 
                onPress={()=>{}}
                style={styles.card}>

                <View style={styles.topRow}>
                    <Text style={styles.titleText}>{item.titre}</Text>

                    <View style={styles.badge}>
                        <Text style={[styles.badgeText,{color:item.type.couleur}]}>{item.type.libelle}</Text>
                    </View>
                </View>
                
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>Par {item.auteur.pseudo}</Text>
                    <Text style={styles.metaText}>{dateText}</Text>

                 
                        {item.categorie ? (
                                    <View style={styles.badge}>
                                        <Text style={[styles.badgeText, { color: item.categorie.couleur }]}>
                                        {item.categorie.libelle}
                                        </Text>
                                    </View>
                                    ) : null}

                  

                    <Text style={styles.metaText}>❤️ {item.adore_count}</Text>
                </View>

                <View style={styles.tagsRow}>
                {item.tags.map((t) => (
                    <View key={t.id_tag} style={styles.tag}>
                    <Text style={[styles.tagText, { color: t.couleur }]}>
                        #{t.libelle}
                    </Text>
                    </View>
                ))}
                </View>
                
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Ressources</Text>
            <Text style={styles.subtitle}>Listes des ressources</Text>

            <FlatList 
                data={ressources} 
                keyExtractor={(item)=>String(item.id_ressource)} 
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.empty}>Aucune ressources disponible</Text>
                }/>
        </SafeAreaView>
    )

}
