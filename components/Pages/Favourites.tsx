import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Favourites() {
  const navigation = useNavigation();
  function nav() {
    navigation.goBack();
  }
  return (
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
          }}
        >
          No favorite foods yet!
        </Text>
      </View>
      <View style={{ flex: 2, width: "100%" }}>
        <HalfBottomButton title="Explore Now" handleClick={nav} width={"50%"} />
      </View>
    </View>
  );
}

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
});
