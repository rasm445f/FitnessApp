import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const workoutSets = [
  { id: "1", name: "Push-ups", reps: 15 },
  { id: "2", name: "Squats", reps: 20 },
  { id: "3", name: "Lunges", reps: 15 },
  { id: "4", name: "Plank", duration: "1 min" },
];

const WorkoutSet = ({ name, reps, duration }) => (
  <View style={styles.workoutSet}>
    <Text style={styles.workoutName}>{name}</Text>
    {reps && <Text style={styles.workoutDetail}>Reps: {reps}</Text>}
    {duration && <Text style={styles.workoutDetail}>Duration: {duration}</Text>}
  </View>
);

export default function DiscoverScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Workouts</Text>
      <FlatList
        data={workoutSets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutSet
            name={item.name}
            reps={item.reps}
            duration={item.duration}
          />
        )}
      />
      <Button
        title="Go to Exercise"
        onPress={() => navigation.navigate("exercise")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  workoutSet: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workoutDetail: {
    fontSize: 16,
    color: "#555",
  },
});
