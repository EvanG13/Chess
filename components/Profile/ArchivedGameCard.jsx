import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

const ArchivedGameCard = ({game, playerUsername}) => {
    let result = "draw"; 
    let player = (game.players[0].username === playerUsername) ? game.players[0] : game.players[1];
    if(!game.players[0].isWinner && !game.players[1].isWinner){
        result = "draw";
    }
    else{
        if(player.isWinner)
            result = "win";
        else{
            result = "loss";
        }
    }

    const reviewGame = () =>{
        //TODO pass the navigation prop down the line 
        //use the navigation to nav to a GameReview component also passing in the game.id or the moveList? 
    }

    return (
        <TouchableOpacity style={styles.archivedCard} onPress={reviewGame}>
            <View>
                <Image style={styles.timeIcon}/>
            </View>
            <View style={styles.playerRows}>
                {game.players.map( (player) =>{
                   return <PlayerInfoRow color={player.color} username={player.username} rating={player.rating} key={player.username}/>
                })}
            </View>
            <ResultCard reason={game.resultReason} gameResult ={result}/>
            <View style={styles.numMovesContainer}>
                <Text>{game.numMoves}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text>{game.created}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ResultCard = ({gameResult, reasons} ) =>{
    return (
        <View style={styles.resultCard}>
            <Text>{gameResult}</Text>
        </View>
    )
}

const PlayerInfoRow = ({color, username, rating}) =>{

    return (
        <View style={styles.playerRow}>
            <View style={color === "white" ? styles.whiteSquare : styles.blackSquare}></View>
            <Text>{username}</Text>
            <Text>{`(${rating})`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    archivedCard: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        alignItems: "center",
        backgroundColor: "grey",
        borderColor: "black",
        borderBottomWidth: 2,
        marginBottom: 2
    },
    timeIcon:{
        width: "5%"
    },
    playerRows: {
        flexDirection: "column",
        width: "8%"
    },
    playerRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    numMovesContainer:{

    },
    dateContainer:{
        width: "25%"
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
        width: "25%",
        height: "100%"
    }

});

export default ArchivedGameCard;
