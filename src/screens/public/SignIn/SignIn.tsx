import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { Container } from "./components/styled-components";
import { SignInStyles } from "./styles";
import { useAuthentication } from "../../../providers/Authentication/Authentication";
import i18next from "i18next";
import TextPick from "../../../i18n/text-pick";

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, status } = useAuthentication();

  function handleSignIn() {
    signIn({ login, password });
  }

  return (
    <Container>
      <Text variant="displaySmall">
        {i18next.t(TextPick.Screens.SignInScreen.title)}
      </Text>

      <TextInput
        value={login}
        onChangeText={setLogin}
        label="E-mail"
        style={SignInStyles.input}
        right={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={SignInStyles.input}
        right={<TextInput.Icon icon="eye" />}
      />

      <Button
        icon="login"
        loading={status.isRunning()}
        mode="contained"
        style={SignInStyles.button}
        onPress={handleSignIn}
      >
        {i18next.t(TextPick.Screens.SignInScreen.loginButton)}
      </Button>
    </Container>
  );
}
