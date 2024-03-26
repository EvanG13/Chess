import { View, ImageBackground, Image, StyleSheet } from "react-native";

export const BoardSquare = ({ src, letter, number, piece }) => {
    return (
        <View style={styles.square}>

            {piece!= null && <Image source={piece.src} alt={piece.name} style={styles.pieceImg}/>}
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
    pieceImg: {
        width: 45,
        height: 45,
    },
});