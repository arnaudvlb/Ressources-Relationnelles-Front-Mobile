import { StyleSheet } from "react-native";

export function makeLoginStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      padding: 24,
      gap: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      color: colors.muted,
    },
    card: {
      marginTop: 8,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },
    button: {
      marginTop: 4,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.accent,
    },
    buttonText: {
      color: "#08131F",
      fontWeight: "900",
      fontSize: 16,
    },
    link: {
      textAlign: "center",
      fontWeight: "800",
      color: colors.primary,
    },

  header: { 
    gap: 6,
    marginBottom: 12 
  },

  actions: { 
    gap: 10, 
    marginTop: 10 
  },

  helper: { 
    fontSize: 12, 
    opacity: 0.7, 
    color:colors.text
  },

  errorBox: { 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    marginBottom: 10,
    backgroundColor:"#FFFF", 
    borderColor:"#ff0000", 
  },
  errorText: { 
    fontSize: 13, 
    
  },
successBox: {  
  padding: 12, 
  borderRadius: 12, 
  borderWidth: 1, 
  marginBottom: 10,
  backgroundColor:"#FFFF" ,
  borderColor:"#00ff51" ,
 },
successText: {
   fontSize: 13 
  }
  });
}