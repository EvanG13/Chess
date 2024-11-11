import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const timeIcons = {
  bullet: require("../../assets/appImages/bullet.png"),
  blitz: require("../../assets/appImages/blitz.png"),
  rapid: require("../../assets/appImages/rapid.png"),
  classical: require("../../assets/appImages/classical.jpg")
};

const ArchivedGameCard = ({ game, playerUsername, cardNumber }) => {
  let backgroundColor =
    Number(cardNumber) % 2 != 0 ? styles.oddBackground : styles.evenBackground;
  let iconKey = game.timeControl.split("_")[0].toLowerCase();
  let result = "draw";
  let player =
    game.players[0].username === playerUsername
      ? game.players[0]
      : game.players[1];
  if (!game.players[0].isWinner && !game.players[1].isWinner) {
    result = "draw";
  } else {
    if (player.isWinner) result = "win";
    else {
      result = "loss";
    }
  }

  const reviewGame = () => {
    //TODO pass the navigation prop down the line
    //use the navigation to nav to a GameReview component also passing in the game.id as a param
  };

  return (
    <TouchableOpacity
      style={[styles.archivedCard, backgroundColor]}
      onPress={reviewGame}
    >
      <View style={styles.playersBox}>
        <View>
          <Image style={styles.timeIcon} source={timeIcons[iconKey]} />
        </View>
        <View style={styles.playerRows}>
          {game.players.map((player) => {
            return (
              <PlayerInfoRow
                isWhite={player.isWhite}
                username={player.username}
                rating={player.rating}
                key={player.username}
              />
            );
          })}
        </View>
      </View>
      <ResultCard reason={game.resultReason} gameResult={result} />
      <View style={styles.numMovesContainer}>
        <Text>{game.numMoves}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text>{game.created}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ResultCard = ({ gameResult, reasons }) => {
  return (
    <View style={styles.resultCard}>
      <Text>{gameResult}</Text>
    </View>
  );
};

const PlayerInfoRow = ({ isWhite, username, rating }) => {
  return (
    <View style={styles.playerRow}>
      <View style={isWhite ? styles.whiteSquare : styles.blackSquare}></View>
      <Text>{username}</Text>
      <Text>{`(${rating})`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  archivedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 2,
    marginBottom: 2
  },
  evenBackground: {
    backgroundColor: "grey"
  },

  oddBackground: {
    backgroundColor: "white"
  },

  timeIcon: {
    margin: 4,
    width: 30,
    height: 30
  },
  playersBox: {
    width: "15%",
    flexDirection: "row",
    alignItems: "center"
  },
  playerRows: {
    flexDirection: "column",
    width: "70%"
  },
  playerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  numMovesContainer: {},
  dateContainer: {
    // width: "25%"
  },
  whiteSquare: {
    backgroundColor: "white",
    height: 10,
    width: 10,
    borderRadius: 3
  },
  blackSquare: {
    backgroundColor: "black",
    height: 10,
    width: 10,
    borderRadius: 3
  },
  resultCard: {
    textAlign: "center"
    // width: "25%",
    // height: "100%"
  }
});

export default ArchivedGameCard;
