import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

const ArchivedGameCard = ({players, archiveId, moves, date, game}) => {

    return (
        <TouchableOpacity style={styles.archivedCard}>
            <View>
                <Image style={styles.timeIcon}/>
            </View>
            <View style={styles.playerRows}>
                {players.map( (player) =>{
                    <PlayerInfoRow color={player.color} username={player.username} rating={player.rating}/>
                })}
            </View>
            <ResultCard />
            <View style={styles.numMovesContainer}>
                <Text>{game.numMoves}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text>{game.date}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ResultCard = (isWin, reasons ) =>{

}

const PlayerInfoRow = ({color, username, rating}) =>{

    return (
        <View style={styles.playerRow}>
            <Image style={styles.colorSquare} />
            <Text>{username}</Text>
            <Text>{`(${rating})`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    playerContainer:{

    },
    playerRows: {
        flexDirection: "column"
    },
    playerRow: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }

});

export default ArchivedGameCard;
