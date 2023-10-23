import Colors from "@/constants/Colors";
import utils, { Icon } from "@/constants/utils";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";
import { TextInput } from "react-native-gesture-handler";
import HalfBottomButton from "@/components/Buttons/HalfBottomButton";

const Review = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigation();
  const onSubmit = () => {
    if (submitted == true) {
      navigate.goBack();
    }
    setSubmitted(true);
    setRating(0);
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          marginTop: 240,
          alignItems: "center",
        }}>
        <Text style={styles.hotel}>Hotel Annapoorna</Text>
        <View style={styles.container}>
          <View style={styles.greenDot} />
          <Text style={styles.greenText}>Order Delivered</Text>
        </View>
        <Text style={styles.rateTitle}>
          {!submitted
            ? "Please Rate Delivery Service"
            : "How was your last order from Annapoorna ?"}
        </Text>
        <StarRatingComponent rating={rating} setRating={setRating} />
        <TextInput
          style={styles.textArea}
          placeholder="Write review here..."
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <HalfBottomButton title={"Submit"} handleClick={onSubmit} />
    </ScrollView>
  );
};

const StarRatingComponent = (props: any) => {
  const { rating, setRating } = props;
  const ratings = [
    { label: "Bad 😞" },
    { label: "Average 😐" },
    { label: "Good 😊" },
    { label: "Very Good 😁" },
    { label: "Excellent 😍" },
  ];
  const handleStarRating = (newRating: any) => {
    setRating(newRating);
  };

  return (
    <View style={{ paddingBottom: 12 }}>
      {rating > 0 && (
        <View style={styles.flex}>
          <Text style={styles.ratingText}>{ratings[rating - 1]?.label}</Text>
        </View>
      )}
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating: any) => handleStarRating(rating)}
        fullStarColor="#FDCC0D"
        emptyStarColor="grey"
        starStyle={{ padding: 7 }}
      />
    </View>
  );
};

export function HeaderReview() {
  const randomFoodImage = "https://picsum.photos/200/300";
  const navigate = useNavigation();
  const handleBackPress = () => {
    navigate.goBack();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        paddingTop: 50,
      }}>
      <Image source={{ uri: randomFoodImage }} style={styles.image} />
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <View style={styles.iconPosition}>
          <Icon name="chevron-back" size={30} color={Colors.primary} />
        </View>
      </TouchableOpacity>
      <View style={styles.userProfileContainer}>
        <Image
          source={{
            uri: "https://www.themoviedb.org/t/p/w500/upKrdABAMK7jZevWAoPYI24iKlR.jpg",
          }}
          style={styles.userProfileImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  iconPosition: { backgroundColor: "white", borderRadius: 10, padding: 2 },
  backButton: {
    position: "absolute",
    top: 50,
    left: 0,
    padding: 10,
  },
  userProfileContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: 15,
    borderRadius: 100,
    backgroundColor: "white",
    width: 108,
    height: 108,
    position: "absolute",
    top: 175,
    left: 125,
  },
  userProfileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  userProfileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 4,
  },
  hotel: { color: "black", fontSize: 24, fontWeight: "800" },
  greenText: {
    color: "#53D776",
    fontSize: 18,
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  greenDot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    backgroundColor: "#53D776",
  },
  rateTitle: {
    fontSize: 20,
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    textAlign: "center",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 22,
    fontWeight: "800",
    paddingBottom: 4,
  },
  textArea: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    width: utils.fullwidth - 30,
    borderRadius: 12,
    paddingBottom: 100,
  },
});

export default Review;
