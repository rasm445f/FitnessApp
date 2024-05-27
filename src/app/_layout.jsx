import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useNavigation } from "expo-router";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import AuthScreen from "../auth/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MainContent />
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
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
      <Tabs.Screen name="index" options={{ title: "Workout" }} />
      <Tabs.Screen name="exercise" options={{ title: "Exercise" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
      <Tabs.Screen
        name="[name]"
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
    </Tabs>
  ) : (
    <AuthScreen />
  );
}
