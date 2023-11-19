import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

import { Link } from "expo-router";
import Colors from "@/constants/Colors";

import { useNavigation } from "expo-router";
import { restaurants } from "@/assets/data/home";
import utils from "@/constants/utils";
import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Favourites() {
  const navigation = useNavigation();
  function nav() {
    navigation.goBack();
  }
  return (
    <>
      {false ? (
        <FavouritesCards />
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.emptyIllustration}
              source={require("@/assets/images/favourite.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}>
              No favorite foods yet!
            </Text>
          </View>
          <View style={{ flex: 2, width: "100%" }}>
            <HalfBottomButton
              title="Explore Now"
              handleClick={nav}
              width={"50%"}
            />
          </View>
        </View>
      )}
    </>
  );
}

const FavouritesCards = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 24,
        alignItems: "center",
      }}>
      {restaurants.map((restaurant, index) => (
        <Link href={"/details"} key={index} asChild>
          <Pressable>
            <View style={styles.categoryCard}>
              <Image source={restaurant.img} style={styles.image} />
              <View style={styles.categoryBox}>
                <View>
                  <Text style={styles.categoryText}>{restaurant.name}</Text>
                  <Text style={{ color: Colors.medium }}>
                    {restaurant.distance}
                  </Text>
                  <Text style={{ color: Colors.green }}>
                    {restaurant.rating} {restaurant.ratings}
                  </Text>
                </View>
                {/* <Text style={styles.add}>Add</Text> */}
                <TouchableOpacity>
                  <Ionicons name="heart" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  imageContainer: {
    backgroundColor: "white",
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  emptyIllustration: {
    width: "100%",
    height: 300,
  },
  categoryCard: {
    width: utils.fullwidth - 24,
    height: 250,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
    marginBottom: 16,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  add: {
    fontSize: 18,
    padding: 10,
    color: "white",
    fontWeight: "800",
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
});
