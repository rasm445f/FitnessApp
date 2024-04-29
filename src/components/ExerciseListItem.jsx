import { StyleSheet, Text, View } from "react-native";

export default function ExerciseListItem({ item }) {
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exercisesName}>{item.name}</Text>
      <Text style={styles.exercisesSubtitle}>
        <Text style={styles.subValue}>{item.muscle}</Text> |{" "}
        <Text style={styles.subValue}>{item.equipment}</Text>
      </Text>
    </View>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  exercisesName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exercisesSubtitle: {
    color: "dimgray",
  },
  subValue: {
    textTransform: "capitalize",
  },
});