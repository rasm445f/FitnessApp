import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function WorkoutListItem({ item }) {
  return (
    <Link href={`/${item._id}`} asChild>
      <Pressable style={styles.workoutContainer}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutSubtitle}>{item.description}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  workoutContainer: {
    backgroundColor: "dimgray",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 2,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  workoutName: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  workoutSubtitle: {
    color: "orange",
  },
  subValue: {
    textTransform: "capitalize",
  },
});
