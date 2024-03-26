import { View, StyleSheet, Text } from "react-native";
import {BoardSquare} from "../BoardSquare/BoardSquare";
import {LETTERS} from  "../Board/board.js";
import Pawn from "../../pieces/Pawn";
import getStartingBoard from "../Board/board.js";
import React, {useEffect, useState} from "react";

export const Board = () => {
    const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
    const rows = [];
    const letterRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numberCol = ['8', '7', '6', '5', '4', '3', '2', '1'];
    
    //TODO: fetch the board from the backend with sockets 
  

    return (
        <View style={styles.boardContainer}>
            <View style={styles.boardWithNumbers}>
                <View style={styles.board}>
                    {
                        board.map((row, index) => {
                            return (
                                <View key={`row-${row}`} style={{ flexDirection: "row" }}>
                                     <View key={`number-${index}`}>{numberCol[index]}</View>
                                        {
                                        row.map((square, squareIndex) => {
                                            return (
                                                <BoardSquare
                                                    key={`square-${square.letter}-${square.number}`}
                                                    src={square.src}
                                                    letter={square.letter}
                                                    number={square.number}
                                                    piece={square.piece}
                                                />
                                            );
                                        }) 
                                    }
                                </View>
                            );
                        })
                    }
        </View>
        </View>
        <View style = {{flexDirection: "row"}}>
        {
            letterRow.map((letter, i) => {
                return (
                    <View key={`letter-${i}`} style={{width: 45, marginLeft: 4}}>
                       <Text>{letter}</Text>
                    </View>
                );
            })
        }
        </View>
       
    </View>);
};

const styles = StyleSheet.create({
    board: {
        flexDirection: "column"
    },
    boardWithNumbers: {
        flexDirection: "row"
    },
});

