import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import styles from "./CategoryStatsModalStyling";

const CategoryStatsModal = ({
  setIsModalVisible,
  category,
  setCategory,
}) => {
  const timeCategories = [
    {
      name: "rapid",
      isCurrentCategory: "rapid" === category
    },
    {
      name: "blitz",
      isCurrentCategory: "blitz" === category
    },
    {
      name: "bullet",
      isCurrentCategory: "bullet" === category
    }
  ];

  const handlePress = (categoryName) => {
    setCategory(categoryName);
    setIsModalVisible(false);
  };

  return (
    <Modal isVisible={true} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalStyle}>
          {timeCategories.map((category, index) => (
            <Pressable
              key={index}
              style={styles.modalButton}
              onPress={() => handlePress(category.name)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
              <View
                style={[
                  styles.circle,
                  category.isCurrentCategory
                    ? styles.filledInCircle
                    : styles.outlineCircle
                ]}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default CategoryStatsModal;
