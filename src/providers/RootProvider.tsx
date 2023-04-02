import React from "react";
import { PreferencesProvider } from "./Preferences/Preferences";
import { ChildrenProp } from "../../@types/react-native/ChildrenProps";
import { AuthenticationProvider } from "./Authentication/Authentication";

const RootProvider: React.FC<ChildrenProp> = (props) => (
  <PreferencesProvider>
    <AuthenticationProvider>{props.children}</AuthenticationProvider>
  </PreferencesProvider>
);

export default RootProvider;
