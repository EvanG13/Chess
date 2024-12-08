import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    registerHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white"
    },
    registerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525"
    },
    registerCard: {
        borderRadius: 10,
        overflow: "hidden",
        width: "60%"
    },
    gradient: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "transparent"
    },
    innerCard: {
        backgroundColor: "#121212",
        padding: 20
    },
    input: {
        backgroundColor: "white",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    errorCard: {
        color: "white",
        fontSize: 20,
        marginTop: 10,
        borderRadius: 10
    }
});

export default styles;