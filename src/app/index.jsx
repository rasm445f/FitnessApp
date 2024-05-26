import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function HomeScreen() {
  const { username, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {username}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
