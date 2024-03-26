import { View, ImageBackground, StyleSheet } from "react-native";

export const BoardSquare = ({ src, letter, number }) => {
    return (
        <View style={styles.square}>
            <h1>{letter}</h1>
            <ImageBackground source={src} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    square: {
        width: 45,
        height: 45,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
});