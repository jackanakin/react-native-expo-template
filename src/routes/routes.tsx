import * as React from "react";

import { usePreferences } from "../providers/Preferences/Preferences";
import { useAuthentication } from "../providers/Authentication/Authentication";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import PublicRoutes from "./public/PublicRoutes";
import PrivateRoutes from "./private/PrivateRoutes";

export default function Routes() {
  const { status: preferenceStatus } = usePreferences();
  const { user, status: authenticationStatus } = useAuthentication();

  const isLoading =
    preferenceStatus.isRunning() || authenticationStatus.isRunning();

  if (isLoading) return <LoadingScreen />;
  if (!user) return <PublicRoutes />;

  return <PrivateRoutes />;
}
