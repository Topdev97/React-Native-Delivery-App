import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";

const Categories = () => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} style={{ width: "100%" }} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 0,
  },
  categoryCard: {
    flexBasis: "31%",
    height: 100,
    marginBottom: 16,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Categories;
