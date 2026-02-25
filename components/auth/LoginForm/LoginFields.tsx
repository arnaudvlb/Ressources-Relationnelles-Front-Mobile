import { AppInput } from "@/components/AppInput";

type Props = {
  styles:any,
  email: string,
  password: string,
  setEmail: (text: string) => void,
  setPassword: (text: string) => void,
};

export function LoginFields({ styles,email, password, setEmail, setPassword }: Props) {
  return (
    <>
      <AppInput
        label="Email"
        placeholder="ex: jean@mail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppInput
        label="Mot de passe"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </>
  );
}