import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";

const SearchScreen = () => {
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const focusInput = () => {
      searchInputRef.current?.focus();
    };

    // Delaying the focus to ensure the input is rendered before focusing
    const focusTimeout = setTimeout(focusInput, 500);

    return () => clearTimeout(focusTimeout);
  }, []);

  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={Colors.primary}
            mb={-2}
          />
        </TouchableOpacity>
        <View style={styles.searchField}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color={Colors.medium}
          />
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Discover the dishes you love"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    marginTop: 45,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 10,
    paddingRight: 20,
    alignItems: "center",
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default SearchScreen;
