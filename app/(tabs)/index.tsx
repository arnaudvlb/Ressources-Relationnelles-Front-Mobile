import { Colors } from "@/constants/theme";
import { Text, useColorScheme, View } from "react-native";

export default function Index() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 24,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700" }}>
          Thème OK ✅
        </Text>

        <Text style={{ color: colors.muted, marginTop: 10 }}>
          Bleu / vert / jaune actif
        </Text>

        <Text style={{ color: colors.accent, marginTop: 10, fontWeight: "700" }}>
          Accent jaune 💛
        </Text>
      </View>
    </View>
  );
}