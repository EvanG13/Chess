import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import {Board} from "./components/Board/Board";

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "black",
    },
    text: {
        color: "white",
    }
});