import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";

const SearchScreen = () => {
  const searchInputRef = useRef<TextInput>(null);

  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [searchText, setSearchText] = useState<any>("");

  useEffect(() => {
    const focusInput = () => {
      searchInputRef.current?.focus();
    };

    const focusTimeout = setTimeout(focusInput, 500);

    return () => clearTimeout(focusTimeout);
  }, []);

  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const products = [
    {
      id: 1,
      name: "Spaghetti Bolognese",
      rate: 200,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      rate: 500,
      image: "https://picsum.photos/id/237/200/300",
    },
  ];

  let filterTimeout: any;

  const handleInputChange = (text: any) => {
    setSearchText(text);
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      if (text === "") {
        setFilteredProducts([]);
      } else {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, 1000);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productRate}>
          Price: <Text style={{ fontWeight: "700" }}>₹{item.rate}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
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
              value={searchText}
              onChangeText={handleInputChange}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </>
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
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productRate: {
    color: Colors.mediumDark,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 5,
  },
  addButtonText: {
    color: "#fff",
    padding: 1,
  },
});

export default SearchScreen;
