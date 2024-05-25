import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";

export default function ExploreScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Explore Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("details")}
      />
    </View>
  );
}
