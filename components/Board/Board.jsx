import { View, StyleSheet } from "react-native";
import {BoardSquare} from "../BoardSquare/BoardSquare";
import {LETTERS} from  "../Board/board.js";
import Pawn from "../../pieces/Pawn";
import getStartingBoard from "../Board/board.js";
import React, {useEffect, useState} from "react";

export const Board = () => {
    const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
    const rows = [];
    for (let row = 1; row <= 8; row++) {
        const columns = [];
        for (let col = 1; col <= 8; col++) {

            columns.push(
                <BoardSquare
                    key={`square-${row}-${col}`}
                    src={board[row-1][col-1].src}
                    letter={board[row-1][col-1].letter}
                    number={board[row-1][col-1].number}
                    piece={board[row-1][col-1].piece}
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

