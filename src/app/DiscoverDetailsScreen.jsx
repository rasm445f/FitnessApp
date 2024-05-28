import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

const DiscoverDetailsScreen = () => {
  const route = useRoute();
  const { workoutPlan } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workoutPlan.name}</Text>
      <Text style={styles.description}>{workoutPlan.description}</Text>
      <Text style={styles.date}>
        Created At: {new Date(workoutPlan.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.date}>
        Updated At: {new Date(workoutPlan.updatedAt).toLocaleDateString()}
      </Text>
      <FlatList
        data={workoutPlan.workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.workout}>
            <Text style={styles.workoutDay}>Day: {item.day}</Text>
            {item.exercises.map((exercise, idx) => (
              <View key={idx} style={styles.exercise}>
                <Text>{exercise.name}</Text>
                <Text>Reps: {exercise.reps}</Text>
                <Text>Sets: {exercise.sets}</Text>
                <Text>Rest: {exercise.rest}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
  workout: {
    marginTop: 10,
  },
  workoutDay: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  exercise: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default DiscoverDetailsScreen;
