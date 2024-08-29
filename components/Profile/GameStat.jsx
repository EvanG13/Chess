import { useRoute } from '@react-navigation/native';

const GameStat = () => {
    const route = useRoute();
    const { timeControl } = route.params || {};
    return (
        <div>
        <h1>{timeControl}</h1>
        <p>Wins: 0</p>
        <p>Losses: 0</p>
        </div>
    );
}

export default GameStat;