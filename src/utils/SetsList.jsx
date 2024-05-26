import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../auth/AuthContext";

const setsQuerey = gql`
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

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const { username } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      graphqlClient.request(setsQuerey, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  console.log(data);

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <Text
          style={{
            backgroundColor: "white",
            marginVertical: 5,
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {item.reps} x {item.weight}{" "}
        </Text>
      )}
    />
  );
};

export default SetsList;
