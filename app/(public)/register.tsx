
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import { makeRegisterStyles } from "@/components/auth/RegisterForm/module.RegisterStyles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function Register(){

    //Recuperation du theme 
    const scheme = useColorScheme()??"dark";
    const colors=Colors[scheme];
    const styles = makeRegisterStyles(colors);

    //Interface utilisateur 
    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* KeyboardAvoidingView pour pousser le contenu quand le clavier apparaît */}
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ScrollView pour permettre de scroller sur petit écran */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <RegisterForm
          styles={styles}
          colors={colors}
          >
          </RegisterForm>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
    

}