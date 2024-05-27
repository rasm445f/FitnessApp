import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { Redirect } from "expo-router";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import WorkoutListItem from "./WorkoutListItem";

const workoutsQuery = gql`
  query workoutPlans($username: String!) {
    workoutPlans(username: $username) {
      documents {
        _id
        userName
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

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["workouts", username, debouncedSearchTerm],
      queryFn: ({ pageParam = 0 }) =>
        client.request(workoutsQuery, {
          username,
          offset: pageParam,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    refetch();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch workouts</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  const workouts = data?.pages.flatMap((page) => page.workoutPlans.documents);

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
        onEndReachedThreshold={1}
        onEndReached={loadMore}
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
