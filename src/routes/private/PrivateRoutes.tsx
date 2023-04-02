import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RoutesNames } from "../routes-names";
import HomeScreen from "../../screens/private/Home/Home";

const Stack = createNativeStackNavigator();

const PrivateRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesNames.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RoutesNames.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
