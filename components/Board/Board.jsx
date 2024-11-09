import { View, Text } from "react-native";
import { BoardSquare } from "../BoardSquare/BoardSquare";
import React, { useState, useEffect } from "react";
import { getNumberFromLetter } from "../Board/board.js";
import selectSquare from "./selectSquare.js";
import { Switch } from "react-native-switch";

import styles from "./BoardStyles.js";

const Board = ({
  board,
  isWhiteTurn,
  setHasWon,
  setShowWinner,
  socket,
  isWhite,
  blackSideBoard,
  setBlackSideBoard
}) => {
  const [validMoves, setValidMoves] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState([]); // [number, number] must be a piece
  const [kingSquare, setKingSquare] = useState({
    whiteKing: [7, 4],
    blackKing: [0, 4]
  });
  // const [blackSideBoard, setBlackSideBoard] = useState(false);

  const letterRow = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numberCol = ["8. ", "7. ", "6. ", "5. ", "4. ", "3. ", "2. ", "1. "];

  //close the socket when component dismounts
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, []);

  return (
    <View style={styles.gameView}>
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
          <View style={[styles.board, blackSideBoard && styles.flipped]}>
            {board.board.map((row, index) => {
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
                            selectedSquare,
                            setSelectedSquare,
                            isWhiteTurn,
                            validMoves,
                            setValidMoves,
                            kingSquare,
                            setKingSquare,
                            setHasWon,
                            setShowWinner,
                            socket,
                            isWhite
                          );
                        }}
                        isSelected={
                          selectedSquare[0] === square.number &&
                          selectedSquare[1] ===
                            getNumberFromLetter(square.letter)
                        }
                        flipped={blackSideBoard}
                      />
                    );
                  })}
                  {blackSideBoard && (
                    <View style={{ marginRight: 10 }} key={`number-${index}`}>
                      <Text
                        style={[
                          { color: "white", fontSize: 13 },
                          styles.flipped
                        ]}
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
            {blackSideBoard
              ? letterRow.toReversed().map((letter, i) => {
                  return (
                    <View
                      key={`letter-${i}`}
                      style={{ width: 45, marginLeft: 4 }}
                    >
                      <Text style={{ color: "white" }}>{letter}</Text>
                    </View>
                  );
                })
              : letterRow.map((letter, i) => {
                  return (
                    <View
                      key={`letter-${i}`}
                      style={{ width: 45, marginLeft: 4 }}
                    >
                      <Text style={{ color: "white" }}>{letter}</Text>
                    </View>
                  );
                })}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Board;
