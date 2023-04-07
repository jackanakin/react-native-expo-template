import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuthentication } from "../../../providers/Authentication/Authentication";
import TextPick from "../../../i18n/text-pick";
import i18next from "i18next";

export default function Home() {
  const { user, signOut, status } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Hello {user?.getName()}</Text>
      <Button
        icon="logout"
        loading={status.isRunning()}
        mode="contained"
        onPress={signOut}
      >
        {i18next.t(TextPick.Screens.HomeScreen.logoutButton)}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
