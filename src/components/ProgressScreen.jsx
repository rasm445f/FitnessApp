import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";

export default function ProgressScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("index")} />
    </View>
  );
}
