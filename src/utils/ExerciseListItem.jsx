import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function ExerciseListItem({ item }) {
  return (
    <Link href={`/${item.name}`} asChild>
      <Pressable style={styles.exerciseContainer}>
        <Text style={styles.exercisesName}>{item.name}</Text>
        <Text style={styles.exercisesSubtitle}>
          <Text style={styles.subValue}>{item.muscle}</Text> |{" "}
          <Text style={styles.subValue}>{item.equipment}</Text>
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
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
  exercisesName: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  exercisesSubtitle: {
    color: "orange",
  },
  subValue: {
    textTransform: "capitalize",
  },
});
