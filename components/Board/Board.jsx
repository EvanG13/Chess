import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { BoardSquare } from "../BoardSquare/BoardSquare";
import React, { useState } from "react";
import getStartingBoard, { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import selectSquare from "./selectSquare.js";
import { Modal } from "react-native";
import Logger from "../Logger/Logger.jsx";
import handleNewGame from "./handleNewGame";
import handleRematch from "./handleRematch";
import { Switch } from "react-native-switch";

export const Board = () => {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true if white's turn, false if black's turn
  const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
  const [validMoves, setValidMoves] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState([]); // [number, number] must be a piece
  const [log, setLog] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);
  const [kingSquare, setKingSquare] = useState({
    whiteKing: [7, 4],
    blackKing: [0, 4]
  });
  const [blackSideBoard, setBlackSideBoard] = useState(true);

  const letterRow = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numberCol = ["8. ", "7. ", "6. ", "5. ", "4. ", "3. ", "2. ", "1. "];

  //TODO: fetch the board from the backend with sockets

  return (
    <View style={styles.boardAndLogger}>
      <Switch
        value={blackSideBoard}
        onValueChange={() => setBlackSideBoard(!blackSideBoard)}
        disabled={false}
        activeText={"White"}
        inActiveText={"Black"}
        circleSize={30}
        barHeight={30}
        circleBorderWidth={3}
        backgroundActive={"#696969"}
        backgroundInactive={"#696969"}
        circleActiveColor={"white"}
        circleInActiveColor={"#000000"}
      />
      <View style={styles.boardContainer}>
        <Text
          style={{ color: "white", fontSize: 25, marginBottom: 10 }}
        >{`${isWhiteTurn ? "white" : "black"} player to move.`}</Text>
        <View style={[styles.board, blackSideBoard && styles.flipped]}>
          {board.map((row, index) => {
            return (
              <View key={`row-${index}`} style={{ flexDirection: "row" }}>
                {!blackSideBoard && (
                  <View style={{ marginRight: 10 }} key={`number-${index}`}>
                    <Text style={{ color: "white", fontSize: 13 }}>
                      {numberCol[index]}
                    </Text>
                  </View>
                )}
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
                          setShowWinner,
                          setLog,
                          log,
                          setMoveIndex,
                          moveIndex
                        );
                      }}
                      isSelected={
                        selectedSquare[0] === square.number &&
                        selectedSquare[1] === getNumberFromLetter(square.letter)
                      }
                      flipped={blackSideBoard}
                    />
                  );
                })}
                {blackSideBoard && (
                  <View style={{ marginRight: 10 }} key={`number-${index}`}>
                    <Text
                      style={[{ color: "white", fontSize: 13 }, styles.flipped]}
                    >
                      {numberCol[index]}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.letters}>
          {letterRow.map((letter, i) => {
            return (
              <View key={`letter-${i}`} style={{ width: 45, marginLeft: 4 }}>
                <Text style={{ color: "white" }}>{letter}</Text>
              </View>
            );
          })}
        </View>
        <Logger
          log={log}
          setIsWhiteTurn={setIsWhiteTurn}
          setBoard={setBoard}
          setSelectedSquare={setSelectedSquare}
          moveIndex={moveIndex}
          setMoveIndex={setMoveIndex}
        />
        <Modal
          visible={showWinner}
          animationType="fade"
          onRequestClose={() => setShowWinner(false)}
          transparent
        >
          <SafeAreaView style={[styles.fill, styles.grey]}>
            <TouchableOpacity
              style={styles.darkGreen}
              onPress={() => {
                setShowWinner(false);
              }}
            >
              <Text style={[styles.darkGreen, styles.rightAlign]}>X</Text>
            </TouchableOpacity>
            <Text style={styles.winnerText}>
              {isWhiteTurn ? "Black" : "White"} player has won!
            </Text>
            <TouchableOpacity style={styles.darkGreen} onPress={handleRematch}>
              <Text style={styles.buttonText}>Rematch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.darkGreen} onPress={handleNewGame}>
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
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
    textAlign: "center",
    color: "black",
    backgroundColor: "white"
  },
  darkGreen: {
    backgroundColor: "#006400",
    color: "white"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  rightAlign: {
    padding: "2%",
    textAlign: "right"
  },
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  boardAndLogger: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  letters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginLeft: 40,
    color: "white"
  },
  boardWithNumbers: {
    flexDirection: "row",
    color: "white"
  },
  flipped: {
    transform: [{ rotate: "180deg" }]
  }
});
