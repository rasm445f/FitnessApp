import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useNavigation } from "expo-router";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import AuthScreen from "../auth/auth";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MainContent />
      </QueryClientProvider>
    </AuthProvider>
  );
}

function MainContent() {
  const { username } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (username && navigation) {
      navigation.navigate("exercise");
    }
  }, [username, navigation]);

  return username ? (
    <Tabs>
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="exercise" options={{ title: "Exercise" }} />
      <Tabs.Screen
        name="[name]"
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
    </Tabs>
  ) : (
    <AuthScreen />
  );
}
