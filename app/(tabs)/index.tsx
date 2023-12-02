import React from "react";
import Colors from "@/constants/Colors";

import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";

import Restaurants from "@/components/Restaurants";
import { Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeDataUser } from "@/core/services/home";

const Page = () => {
  const data = homeDataUser({});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 80 }}>
        <Carousel />
        <Text style={styles.header}>Shop By Category</Text>
        <Categories />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
});

export default Page;
