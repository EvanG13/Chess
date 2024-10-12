import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {useState, useEffect} from "react";
import ArchivedGameCard from "./ArchivedGameCard";
import SortCriteria from "../../types/SortCriteria";

const ArchivedGamesContainer = ({games, playerUsername}) =>{
    const [sortCriteria, setSortCriteria] = useState(SortCriteria.DESCENDING);
    const [archivedGames, setArchivedGames] = useState([]);
    useEffect(() => {
        let sortedGames = [...games];
        if(sortCriteria === SortCriteria.DESCENDING)
            sortedGames.sort((game, game2) => new Date(game.created) - new Date(game2.created));
        else
            sortedGames.sort((game, game2) => new Date(game2.created) - new Date(game.created));
        setArchivedGames(sortedGames);
    }, [sortCriteria, games]);


    return (
        <View style= {styles.archivedContainer}>
            <GamesHeader sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
            <View>
                {
                    archivedGames.map((game, index) => {
                       return <ArchivedGameCard game={game} key={`archivedGame-${index}` } playerUsername={playerUsername}/>
                    })
                }
            </View>
        </View>
    )
}

const GamesHeader = ({sortCriteria, setSortCriteria}) =>{
    
    const handlePress = () =>{
        if(sortCriteria === SortCriteria.ASCENDING){
            setSortCriteria(SortCriteria.DESCENDING);
        }
        else{
            setSortCriteria(SortCriteria.ASCENDING);
        }
    }

    return (
        <View style={styles.gameHeader}>
            <Text>Players</Text>
            <Text>Result</Text>
            <Text>Moves</Text>
            <View style={styles.dateAndSort}>
                <Text >Date</Text>
                <TouchableOpacity onPress={handlePress}>
                    
                    <Text>{sortCriteria === SortCriteria.ASCENDING ? "⬇️" : "⬆️"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    archivedContainer: {
        width: "70%",
        marginLeft: "15%",
        marginRight: "15%"
    },
    gameHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    dateAndSort: {
        width: "8%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    }

})

export default ArchivedGamesContainer;