import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import AuthScreen from "../auth/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WorkoutStack from "./navigation/WorkoutStack";
import discover from "./discover";
import exercise from "./exercise";
import progress from "./progress";
import { useNavigation } from "expo-router";
import ExerciseDefaultScreen from "./[name]";

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen
        name="discover"
        component={discover}
        options={{ title: "Discover" }}
      />
      <Tab.Screen
        name="workoutPlan"
        component={WorkoutStack}
        options={{ title: "Workout" }}
      />
      <Tab.Screen
        name="exercise"
        component={exercise}
        options={{ title: "Exercise" }}
      />
      <Tab.Screen
        name="progress"
        component={progress}
        options={{
          title: "Progress",
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="[name]"
        component={ExerciseDefaultScreen}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
    </Tab.Navigator>
  ) : (
    <AuthScreen />
  );
}
