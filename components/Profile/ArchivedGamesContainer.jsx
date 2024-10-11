import {View, Text, TouchableOpacity} from "react-native";
import {useState, useEffect} from "react";
import ArchivedGameCard from "./ArchivedGameCard";

const ArchivedGamesContainer = ({archivedGames}) =>{
    const [sortCriteria, setSortCriteria] = useState(SortCriteria.DESCENDING);
    const [archivedGames, setArchivedGames] = useState(archivedGames);
    useEffect(() => {
        if(sortCriteria == SortCriteria.DESCENDING)
            archivedGames.sort((game, game2) => {game.date - game2.date});
        else
        archivedGames.sort((game, game2) => {game2.date - game.date});
        setArchivedGames([...archivedGames]);
    }, [sortCriteria])

    return (
        <View>
            <GamesHeader sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
            <View>
                {
                    archivedGames.map((game) => {
                        <ArchivedGameCard game={game}/>
                    })
                }
            </View>
        </View>
    )
}

const GamesHeader = ({sortCriteria, setSortCriteria}) =>{
    
    const handlePress = () =>{
        if(sortCriteria == SortCriteria.ASCENDING){
            setSortCriteria(SortCriteria.DESCENDING);
        }
        else{
            setSortCriteria(SortCriteria.ASCENDING);
        }
    }

    return (
        <View >
            <Text>Players</Text>
            <Text>Result</Text>
            <Text>Moves</Text>
            <Text >Date</Text>
            <TouchableOpacity onPress={handlePress}>
                <Text>{sortCriteria === SortCriteria.ASCENDING ? "oldest" : "newest"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ArchivedGamesContainer;