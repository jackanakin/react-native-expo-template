import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { DEFAULT_THEME } from "./themes/default";
import { ChildrenProp } from "../../../@types/react-native/ChildrenProps";

const ThemeProvider: React.FC<ChildrenProp> = (props) => (
  <PaperProvider theme={DEFAULT_THEME}>{props.children}</PaperProvider>
);

export default ThemeProvider;
