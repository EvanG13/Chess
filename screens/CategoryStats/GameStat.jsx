import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import ArchivedGamesContainer from "../ProfileScreen/ArchivedGamesContainer";
import styles from "./gameStatStyles";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "@/services/axios/axiosInstance";
import Header from "@/components/Header/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import CategoryStatsModal from "@/screens/CategoryStats/CategoryStatsModal";

const GameStat = ({ navigation }) => {
  const route = useRoute();
  const { timeControl, username, title } = route.params ?? {};
  const [gameStats, setGameStats] = useState(null);
  const [category, setCategory] = useState(title.toLowerCase());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let userData = null;
      try {
        const token = await SecureStore.getItemAsync("sessionToken");
        if (!token) {
          navigation.navigate("login");
          return;
        }

        const response = await axiosInstance.get(
          `/stats/${username}?timeCategory=${category}`
        );

        userData = response.data;
        setGameStats({ ...userData });
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [username, title, category]);

  const onPress = () => {
    setIsModalOpen(true);
  };

  return (
    <View style={styles.GameStat}>
      <Header navigation={navigation} />
      <View style={styles.headerContainer}>
        <Text style={styles.timeControlTitle}>{category.toUpperCase()}</Text>
        <Pressable onPress={onPress}>
          <Icon name="chevron-down" size={15} color="white" />
        </Pressable>
      </View>

      <Text style={styles.usernameHeader}>{username}</Text>
      {gameStats ? (
        <View style={styles.diagnostics}>
          <Text style={styles.diagnosticsText}>Wins: {gameStats.wins}</Text>
          <Text style={styles.diagnosticsText}>Losses: {gameStats.losses}</Text>
          <Text style={styles.diagnosticsText}>Draws: {gameStats.draws}</Text>
          <Text style={styles.diagnosticsText}>Rating: {gameStats.rating}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Text style={styles.archivedGamesHeader}>Games Played</Text>
      <ArchivedGamesContainer
        playerUsername={username}
        timeControl={timeControl}
      />

      {isModalOpen && (
        <CategoryStatsModal
          setIsModalVisible={setIsModalOpen}
          category={category}
          setCategory={setCategory}
        />
      )}
    </View>
  );
};

export default GameStat;
