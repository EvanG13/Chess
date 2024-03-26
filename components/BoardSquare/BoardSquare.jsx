import { View, ImageBackground, StyleSheet } from "react-native";

export const BoardSquare = ({ src }) => {
    return (
        <View style={styles.square}>
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