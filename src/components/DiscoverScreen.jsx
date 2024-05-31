import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import DiscoverListItem from "./DiscoverListItem";

const allWorkoutPlansQuery = gql`
  query {
    allWorkoutPlans {
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

const fetchAllWorkoutPlans = async () => {
  const data = await client.request(allWorkoutPlansQuery);
  return data.allWorkoutPlans.documents;
};

const DiscoverScreen = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allWorkoutPlans"],
    queryFn: fetchAllWorkoutPlans,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.error("Error fetching workout plans:", error);
    return <Text>Failed to fetch workout plans</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DiscoverListItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    padding: 10,
  },
});

export default DiscoverScreen;
