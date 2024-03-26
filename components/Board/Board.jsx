import { View, StyleSheet } from "react-native";
import {BoardSquare} from "../BoardSquare/BoardSquare";
import {LETTERS} from  "../Board/board.js";
import Pawn from "../../pieces/Pawn";
export const Board = () => {
    const blackSquareSource = require("../../assets/board/blacksquare.jpg");
    const whiteSquareSource = require("../../assets/board/whitesquare.jpg");
    console.log("inside board");
    const rows = [];
    for (let row = 1; row <= 8; row++) {

        const columns = [];
        for (let col = 1; col <= 8; col++) {
            const isWhiteSquare = (row + col) % 2 === 0;

            columns.push(
                <BoardSquare
                    key={`square-${row}-${col}`}
                    src={isWhiteSquare ? whiteSquareSource : blackSquareSource}
                    letter={LETTERS[col.toString()]}
                    number={row}
                    piece={new Pawn("black", "a", 1)}
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

