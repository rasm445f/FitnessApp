import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScreen from "../../components/workoutPlans/WorkoutsScreen";
import WorkoutDetailsScreen from "../WorkoutDetailsScreen";

const Stack = createNativeStackNavigator();

function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutDetailsScreen"
        component={WorkoutDetailsScreen}
        options={{ title: "Workout Details" }}
      />
    </Stack.Navigator>
  );
}

export default WorkoutStack;
