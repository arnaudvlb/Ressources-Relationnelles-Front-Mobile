import { makeLoginStyles } from "@/components/auth/LoginForm/module.loginStyles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";

export function useLoginStyles() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  return makeLoginStyles(colors);
}