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
        position: 'relative',
    },

    pieceImg: {
        width: 45,
        height: 45,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2, 
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        position: 'absolute', 
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
    },

});
