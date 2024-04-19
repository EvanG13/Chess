import { View, StyleSheet, Text } from "react-native";

const Move = ({
  notation,
  board,
  isWhiteTurn,
  setBoardAndIndex,
  isActive,
  index,
  setIsWhiteTurn
}) => {
  return (
    <View>
      <Text
        style={isActive ? styles.isActive : styles.isNotActive}
        onPress={() => {
          setIsWhiteTurn(isWhiteTurn);
          setBoardAndIndex(board, index);
        }}
      >
        {notation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  isActive: {
    color: "blue"
  },
  isNotActive: {
    color: "black"
  }
});

export default Move;
