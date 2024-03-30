import { View, StyleSheet, Text } from "react-native";
import { BoardSquare } from "../BoardSquare/BoardSquare";
import React, { useState } from "react";
import getStartingBoard, { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";

export const Board = () => {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true if white's turn, false if black's turn
  const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
  const [validMoves, setValidMoves] = useState([]);
  const letterRow = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numberCol = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const [selectedSquare, setSelectedSquare] = useState([]); // [number, number] must be a piece
  //TODO: fetch the board from the backend with sockets

  const selectSquare = (number, letter) => {
    let row = number;
    let col = getNumberFromLetter(letter);
    
    //no piece is selected currently
    if (selectedSquare.length === 0) {
      if (board[row][col].piece) {
        if (
          (board[row][col].piece.color === "white" && isWhiteTurn) ||
          (board[row][col].piece.color === "black" && !isWhiteTurn)
        ) {
          setSelectedSquare([row, col]);
          setValidMoves([...board[row][col].piece.getValidMoves(board)]);
        }
      }
      return;
    }
    //if destination square has a piece in it
    if (board[row][col].piece != null) {
      //player tries to take their own piece
      if (
        board[row][col].piece.color ===
        board[selectedSquare[0]][selectedSquare[1]].piece.color
      ) {
        setSelectedSquare([]);
        setValidMoves([]);
        return;
      }
      //player tries to take opponent's piece
      else if (
        (board[row][col].piece.color === "black" &&
          board[selectedSquare[0]][selectedSquare[1]].piece.color ===
            "white") ||
        (board[row][col].piece.color === "white" &&
          board[selectedSquare[0]][selectedSquare[1]].piece.color === "black")
      ) {
        //move the piece from selected square to destination square and take the opponent's piece
        const newBoard = [...board];
        newBoard[row][col].piece = board[selectedSquare[0]][selectedSquare[1]].piece;
        newBoard[row][col].piece.letter = LETTERS[col+1];
        newBoard[row][col].piece.number = row;
        newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
        setBoard(newBoard);
        setSelectedSquare([]);
        setValidMoves([]);
        let newTurn = !isWhiteTurn;
        setIsWhiteTurn(newTurn);
        return;
      }
    }
    //destination square is empty
    const newBoard = [...board];
    newBoard[row][col].piece =
      board[selectedSquare[0]][selectedSquare[1]].piece;
      newBoard[row][col].piece.letter = LETTERS[col+1];
      newBoard[row][col].piece.number = row;
    newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
    setBoard(newBoard);
    setSelectedSquare([]);
    setValidMoves([]);
    let newTurn = !isWhiteTurn;
    setIsWhiteTurn(newTurn);
  };

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
                      isHighlighted={validMoves.some((move) => move[0] === square.number && move[1] === getNumberFromLetter(square.letter) )}
                      key={`square-${square.letter}-${square.number}`}
                      src={square.src}
                      letter={square.letter}
                      number={square.number}
                      piece={square.piece}
                      selectSquare={selectSquare}
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
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column"
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
