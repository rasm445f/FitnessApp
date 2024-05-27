import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineGraph } from "react-native-graph";
import { gql } from "graphql-request";

// Mock data
const mockData = {
  sets: {
    documents: [
      {
        _id: "1",
        exercise: "Rickshaw Carry",
        reps: 10,
        weight: 50,
      },
      {
        _id: "2",
        exercise: "Rickshaw Carry",
        reps: 12,
        weight: 55,
      },
      {
        _id: "3",
        exercise: "Rickshaw Carry",
        reps: 14,
        weight: 60,
      },
      {
        _id: "5",
        exercise: "Rickshaw Carry",
        reps: 18,
        weight: 70,
      },
      {
        _id: "4",
        exercise: "Leg Press",
        reps: 16,
        weight: 65,
      },
      {
        _id: "6",
        exercise: "Leg Press",
        reps: 18,
        weight: 70,
      },
      {
        _id: "7",
        exercise: "Leg Press",
        reps: 20,
        weight: 75,
      },
      {
        _id: "8",
        exercise: "Leg Press",
        reps: 22,
        weight: 80,
      },
      {
        _id: "9",
        exercise: "Bench Press",
        reps: 24,
        weight: 85,
      },
      {
        _id: "10",
        exercise: "Bench Press",
        reps: 26,
        weight: 90,
      },
      {
        _id: "11",
        exercise: "Bench Press",
        reps: 28,
        weight: 95,
      },
      {
        _id: "12",
        exercise: "Bench Press",
        reps: 30,
        weight: 100,
      },
    ],
  },
};

// GraphQL query (example, not used in this mock setup)
const userSetsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const ProgressGraph = () => {
  // Extract mock data
  const documents = mockData.sets.documents;

  // Get unique exercises
  const exercises = [...new Set(documents.map((doc) => doc.exercise))];

  // Function to get points for each exercise
  const getPointsForExercise = (exercise) => {
    return documents
      .filter((doc) => doc.exercise === exercise)
      .map((doc, index) => ({
        date: new Date(`2021-01-${index + 1}`), // Dummy date
        value: doc.reps, // Using reps as the value for the graph
      }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {exercises.map((exercise) => (
        <View key={exercise} style={styles.container}>
          <Text style={styles.exerciseTitle}>{exercise} Progress Graph</Text>
          <LineGraph
            points={getPointsForExercise(exercise)}
            animated={false}
            color="#4484B2"
            style={styles.graph}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  graph: {
    width: "100%",
    height: 200,
  },
});

export default ProgressGraph;
