import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./gameStatStyles";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "@/services/axios/axiosInstance";
import Header from "@/components/Header/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import CategoryStatsModal from "@/screens/CategoryStats/CategoryStatsModal";
import { SafeAreaView } from "react-native-safe-area-context";
import TimeCategoryRecordCards from "@/components/TimeCategoryRecordCards/TimeCategoryRecordCards";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ArchivedGamesContainer from "@/components/ArchivedGamesContainer/ArchivedGamesContainer";

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

  const getIcon = () => {
    if (category === "bullet") {
      return <MaterialCommunityIcons name="bullet" size={25} color="yellow" />;
    } else if (category === "blitz") {
      return <FontAwesome name="bolt" size={25} color="yellow" />;
    }

    return <MaterialCommunityIcons name="timer-outline" size={25} color="green" />
  }

  return (
    <SafeAreaView style={styles.GameStat}>
      <Header navigation={navigation} />
      <Pressable style={styles.headerContainer} onPress={onPress}>
        {getIcon()}
        <Text style={styles.timeControlTitle}>{category.toUpperCase()}</Text>
        <Icon name="chevron-down" size={15} color="white" />
      </Pressable>

      <Text style={styles.usernameHeader}>{username}</Text>
      {gameStats ? (
        <View style={styles.diagnostics}>
          <View style={styles.ratingContainer}>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={[styles.diagnosticsText, styles.ratingText]}>
              {gameStats.rating}
            </Text>
          </View>

          <TimeCategoryRecordCards
            wins={gameStats.wins}
            draws={gameStats.draws}
            losses={gameStats.losses}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      <Text style={styles.archivedGamesHeader}>Games Played</Text>

      <ArchivedGamesContainer
        playerUsername={username}
        timeControl={timeControl}
        navigation={navigation}
      />

      {isModalOpen && (
        <CategoryStatsModal
          setIsModalVisible={setIsModalOpen}
          category={category}
          setCategory={setCategory}
        />
      )}
    </SafeAreaView>
  );
};

export default GameStat;
