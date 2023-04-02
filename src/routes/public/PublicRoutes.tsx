import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RoutesNames } from "../routes-names";
import SignInScreen from "../../screens/public/SignIn/SignIn";

const Stack = createNativeStackNavigator();

const PublicRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesNames.SignInScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RoutesNames.SignInScreen} component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
