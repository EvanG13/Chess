import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable
} from "react-native";

export const BoardSquare = ({
  src,
  letter,
  number,
  piece,
  isSelected,
  selectSquare,
  isHighlighted
}) => {
  return (
    <Pressable
      style={styles.square}
      onPress={() => selectSquare(number, letter)}
    >
      <View style={isSelected ? styles.selectedSquare : styles.square}>
        {piece != null && <Image source={piece.src} style={styles.pieceImg} />}
        <ImageBackground source={src} style={isHighlighted ? styles.isValidMove : styles.image } />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 45,
    height: 45,
    position: "relative"
  },
  selectedSquare: {
    width: 45,
    height: 45,
    boxSizing: "border-box",
    position: "relative",
    border: "solid 1px red",
    borderColor: "red",
    borderWidth: 1
  },
  isValidMove: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "solid 3px purple",
    borderColor: "purple",
    borderWidth: 3
  },
  pieceImg: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }
});
