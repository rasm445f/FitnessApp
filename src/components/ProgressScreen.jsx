import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useAuth } from "../auth/AuthContext";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { LineGraph } from "react-native-graph";
import { ObjectId } from "bson";

const setsByUsername = gql`
  query setsByUsername($username: String!) {
    setsByUsername(username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const getDateFromObjectId = (objectId) => {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

const ProgressScreen = () => {
  const { username } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["setsByUsername", username],
    queryFn: () =>
      client.request(setsByUsername, {
        username,
      }),
    enabled: !!username,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const sets = data?.setsByUsername?.documents || [];

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Group sets by exercise
  const groupedSets = sets.reduce((acc, set) => {
    if (!acc[set.exercise]) {
      acc[set.exercise] = [];
    }
    acc[set.exercise].push(set);
    return acc;
  }, {});

  const getPointsForExercise = (exercise) => {
    const points = groupedSets[exercise].map((set) => ({
      date: getDateFromObjectId(set._id),
      value: set.reps,
    }));
    console.log(`Points for ${exercise}:`, points);
    return points;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {Object.keys(groupedSets).map((exercise) => (
        <View key={exercise} style={styles.container}>
          <Text style={styles.exerciseTitle}>{exercise} Progress Graph</Text>
          <LineGraph
            points={getPointsForExercise(exercise)}
            color="#4484B2"
            animated={true}
            style={styles.graph}
            lineThickness={2}
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

export default ProgressScreen;
