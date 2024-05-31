import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../auth/AuthContext";
import { formatDistanceToNow } from "date-fns";

const setsQuery = gql`
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
    queryKey: ["sets", exerciseName, username],
    queryFn: () =>
      graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }) => {
    const timestamp = parseInt(item._id.substring(0, 8), 16) * 1000;
    const createdAt = new Date(timestamp);

    return (
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 5,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>
          {item.reps} x {item.weight}
        </Text>
        <Text style={{ color: "gray" }}>
          {formatDistanceToNow(createdAt)} ago
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

export default SetsList;
