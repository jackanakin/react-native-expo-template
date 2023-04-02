import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const DEFAULT_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue",
    secondary: "yellow",
  },
};
