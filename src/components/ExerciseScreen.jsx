import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import ExerciseListItem from "../utils/ExerciseListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { useAuth } from "../auth/AuthContext";
import { Redirect } from "expo-router";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExerciseScreen() {
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises"],
      queryFn: ({ pageParam }) =>
        client.request(exercisesQuery, { offset: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });

  const { username } = useAuth();

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Failed to fetch exercises</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  const exercises = data?.pages.flatMap((page) => page.exercises);

  return (
    <View style={styles.container}>
      <Text>{username}</Text>
      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
});
