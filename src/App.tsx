import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./routes/routes";
import ThemeProvider from "./config/theming/ThemeProvider";
import ContextProvider from "./providers/RootProvider";
import { navigationRef } from "./@common/Navigation/utils/navigation";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ContextProvider>
        <ThemeProvider>
          <Routes />
          <StatusBar style="auto" />
        </ThemeProvider>
      </ContextProvider>
    </NavigationContainer>
  );
}
