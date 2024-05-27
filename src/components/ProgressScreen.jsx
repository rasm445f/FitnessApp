import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";
import ProgressGraph from "./progressGraph";

export default function ProgressScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <ProgressGraph />
    </View>
  );
}
