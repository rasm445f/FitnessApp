import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import exercises from "./assets/data/exercises.json";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function App() {
  const exercise = exercises[0];

  return (
    <View style={styles.container}>
      <View style={styles.exerciseContainer}>
        <Text style={styles.exercisesName}>{exercise.name}</Text>
        <Text style={styles.exercisesSubtitle}>
          {capitalizeFirstLetter(exercise.muscle)} |{" "}
          {capitalizeFirstLetter(exercise.equipment)}
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    justifyContent: "center",
    padding: 10,
  },
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
});
