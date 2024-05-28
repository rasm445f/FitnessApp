import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverDetailsScreen from "../DiscoverDetailsScreen";
import DiscoverScreen from "../../components/DiscoverScreen";

const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiscoverDetailsScreen"
        component={DiscoverDetailsScreen}
        options={{ title: "Discover Details" }}
      />
    </Stack.Navigator>
  );
}

export default DiscoverStack;
