import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScreen from "../../components/workoutPlans/WorkoutsScreen";
import WorkoutDetailsScreen from "../WorkoutDetailsScreen";
import DiscoverDetailsScreen from "../DiscoverDetailsScreen";

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
      <Stack.Screen
        name="DiscoverDetailsScreen"
        component={DiscoverDetailsScreen}
        options={{ title: "Discover Details" }} // Set the title for your new screen here
      />
    </Stack.Navigator>
  );
}

export default WorkoutStack;
