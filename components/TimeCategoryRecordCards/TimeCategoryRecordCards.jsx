import React from "react";
import { Text, View } from "react-native";
import styles from "./timeCategoryRecordCardsStyles";

const TimeCategoryRecordCards = ({ wins, draws, losses }) => {
  return (
    <View style={styles.diagnostics}>
      <View style={styles.innerDiagnosticsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Wins</Text>
          <Text style={styles.diagnosticsText}>{wins}</Text>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Draws</Text>
          <Text style={styles.diagnosticsText}>{draws}</Text>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Losses</Text>
          <Text style={styles.diagnosticsText}>{losses}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimeCategoryRecordCards;
