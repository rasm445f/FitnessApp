import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { Redirect } from "expo-router";

import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import client from "../../graphqlClient";
import { useAuth } from "../../auth/AuthContext";
import WorkoutListItem from "./WorkoutListItem";

const workoutsQuery = gql`
  query workoutPlans($username: String!) {
    workoutPlans(username: $username) {
      documents {
        _id
        username
        name
        description
        createdAt
        updatedAt
        workouts {
          day
          exercises {
            name
            reps
            sets
            rest
          }
        }
      }
    }
  }
`;

export default function WorkoutScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search.trim(), 1000);
  const { username } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["workouts", username, debouncedSearchTerm],
    queryFn: () =>
      client.request(workoutsQuery, {
        username,
      }),
    enabled: !!username,
  });

  const handleSearchChange = (text) => {
    setSearch(text);
    refetch();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.error("Error fetching workouts:", error);
    return <Text>Failed to fetch workouts</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  const workouts = data?.workoutPlans?.documents || [];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search workouts"
        value={search}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 5 }}
        style={{ padding: 10 }}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({ item }) => <WorkoutListItem item={item} />}
        contentInsetAdjustmentBehavior="automatic"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});
