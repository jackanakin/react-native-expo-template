import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, TextInput, Text, Chip } from "react-native-paper";
import i18next from "i18next";

import { Container } from "./components/styled-components";
import { SignInStyles } from "./styles";
import { useAuthentication } from "../../../providers/Authentication/Authentication";
import TextPick from "../../../i18n/text-pick";
import { usePreferences } from "../../../providers/Preferences/Preferences";
import { LanguageSelectorModal } from "../../../components/Modal/LanguagesSelector/LanguageSelectorModal";

export default function SignIn() {
  const { signIn, status } = useAuthentication();
  const { language } = usePreferences();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [languageModal, setLanguageModal] = useState(false);

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
        label={`${i18next.t(TextPick.Screens.SignInScreen.login)}`}
        style={SignInStyles.input}
        right={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label={`${i18next.t(TextPick.Screens.SignInScreen.password)}`}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={SignInStyles.input}
        right={<TextInput.Icon icon="eye" />}
      />
      
      <>
        <Chip
          style={{ height: 50 }}
          icon="information"
          onPress={() => setLanguageModal(true)}
        >
          {language.getName()}
        </Chip>

        <LanguageSelectorModal
          visible={languageModal}
          setVisible={setLanguageModal}
        />
      </>

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
