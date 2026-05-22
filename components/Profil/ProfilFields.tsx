
import { Pressable, Text, View } from "react-native";
import { AppInput } from "../AppInput";

type Props = {
  styles: any,
  colors: any,
  pseudo: string,
  setPseudo: (value: string) => void,
  prenom: string,
  setPrenom: (value: string) => void,
  nom: string,
  setNom: (value: string) => void,
  email: string,
  setEmail: (value: string) => void,
  telephone: string,
  setTelephone: (value: string) => void,
  saving: boolean,
  handleCancelEdit: () => void,
  handleSaveProfile: () => void,
};

export default function ProfilFields({styles,colors,pseudo,setPseudo,prenom,setPrenom,nom,setNom,email,setEmail,telephone,setTelephone,saving,handleCancelEdit,handleSaveProfile,}: Readonly<Props>) {
  return (
    <>
      <AppInput
        label="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        placeholder="Pseudo"
      />

      <AppInput
        label="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Prénom"
      />

      <AppInput
        label="Nom"
        value={nom}
        onChangeText={setNom}
        placeholder="Nom"
      />

      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppInput
        label="Téléphone"
        value={telephone}
        onChangeText={setTelephone}
        placeholder="Téléphone"
        keyboardType="phone-pad"
      />

      <View style={styles.buttonRow}>
        <Pressable
          onPress={handleCancelEdit}
          style={styles.secondaryButton}
          disabled={saving}
        >
          <Text style={styles.secondaryButtonText}>Annuler</Text>
        </Pressable>

        <Pressable
          onPress={handleSaveProfile}
          style={styles.primaryButton}
          disabled={saving}
        >
          <Text style={styles.primaryButtonText}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}