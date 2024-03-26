import { View, StyleSheet } from "react-native";
import {BoardSquare} from "../BoardSquare/BoardSquare";

export const Board = () => {
    const blackSquareSource = require("../../assets/board/blacksquare.jpg");
    const whiteSquareSource = require("../../assets/board/whitesquare.jpg");

    const rows = [];
    for (let row = 1; row <= 8; row++) {

        const columns = [];
        for (let col = 1; col <= 8; col++) {
            const isWhiteSquare = (row + col) % 2 === 0;

            columns.push(
                <BoardSquare
                    key={`square-${row}-${col}`}
                    src={isWhiteSquare ? whiteSquareSource : blackSquareSource}
                />
            );
        }

        rows.push(
            <View key={`row-${row}`} style={{ flexDirection: "row" }}>
                {columns}
            </View>
        );
    }

    return <View style={styles.board}>{rows}</View>;
};

const styles = StyleSheet.create({
    board: {
        flexDirection: "column"
    },
});

