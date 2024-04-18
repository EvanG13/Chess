import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import { BoardSquare } from "../BoardSquare/BoardSquare";
import React, { useState } from "react";
import getStartingBoard, { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import selectSquare from "./selectSquare.js";
import { Modal } from "react-native";

import handleNewGame from "./handleNewGame";
import handleRematch from "./handleRematch";
export const Board = () => {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true if white's turn, false if black's turn
  const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
  const [validMoves, setValidMoves] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const letterRow = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numberCol = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const [selectedSquare, setSelectedSquare] = useState([]); // [number, number] must be a piece
  const [kingSquare, setKingSquare] = useState({
    whiteKing: [7, 4],
    blackKing: [0, 4]
  });

  //TODO: fetch the board from the backend with sockets

  return (
    <View style={styles.boardContainer}>
      <Text>{`${isWhiteTurn ? "white" : "black"} player to move.`}</Text>
      <View style={styles.boardWithNumbers}>
        <View style={styles.board}>
          {board.map((row, index) => {
            return (
              <View key={`row-${index}`} style={{ flexDirection: "row" }}>
                <View key={`number-${index}`}>
                  <Text>{numberCol[index]}</Text>
                </View>
                {row.map((square, squareIndex) => {
                  return (
                    <BoardSquare
                      isHighlighted={validMoves.some(
                        (move) =>
                          move[0] === square.number &&
                          move[1] === getNumberFromLetter(square.letter)
                      )}
                      key={`square-${square.letter}-${square.number}`}
                      src={square.src}
                      letter={square.letter}
                      number={square.number}
                      piece={square.piece}
                      selectSquare={() => {
                        selectSquare(
                          square.number,
                          square.letter,
                          board,
                          setBoard,
                          selectedSquare,
                          setSelectedSquare,
                          isWhiteTurn,
                          setIsWhiteTurn,
                          validMoves,
                          setValidMoves,
                          kingSquare,
                          setKingSquare,
                          setHasWon,
                          hasWon,
                          setShowWinner
                        );
                      }}
                      isSelected={
                        selectedSquare[0] === square.number &&
                        selectedSquare[1] === getNumberFromLetter(square.letter)
                      }
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.letters}>
        {letterRow.map((letter, i) => {
          return (
            <View key={`letter-${i}`} style={{ width: 45, marginLeft: 4 }}>
              <Text>{letter}</Text>
            </View>
          );
        })}
      </View>
      <Modal
        visible={showWinner}
        animationType="fade"
        onRequestClose={() => setShowWinner(false)}
        transparent
      >
        <SafeAreaView style={[styles.fill, styles.grey]}>
          <Button
            title="X"
            onPress={() => {
              setShowWinner(false);
            }}
          />
          <Text style={styles.winnerText}>
            {isWhiteTurn ? "Black" : "White"} player has won!
          </Text>
          <Button title="Rematch" onPress={handleRematch} />
          <Button title="New Game" onPress={handleNewGame}></Button>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column"
  },
  fill: {
    flex: 1
  },
  winnerText: {
    textAlign: "center"
  },
  upper: {
    hieght: 100,
    backgroundColor: "#DDD",
    opacity: 0.5
  },
  lower: {
    flex: 1,
    backgroundColor: "white"
  },
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  letters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginLeft: 40
  },
  boardWithNumbers: {
    flexDirection: "row"
  }
});
