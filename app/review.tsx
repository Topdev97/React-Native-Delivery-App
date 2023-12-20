import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import Colors from "@/constants/Colors";

import { useNavigation } from "expo-router";
import utils, { Icon } from "@/constants/utils";

import { postReview } from "@/core/services/home";
import StarRating from "react-native-star-rating";

import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import { ToastAndroid } from "react-native";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState<any>(false);

  const [reviewType, setReviewType] = useState(0);

  const route = useRoute();
  const navigate = useNavigation();
  const data = JSON.parse(route?.params?.data);

  const review = postReview({
    onSuccess: () => {
      ToastAndroid.showWithGravity(
        "Review Placed Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setRating(0);
      setReviewType(1);
      setDescription(false);
    },
  });

  let title: any;
  if (rating == 0) {
    title = "Bad 😞";
  }
  if (rating == 1) {
    title = "Average 😐";
  }
  if (rating == 2) {
    title = "Good 😊";
  }
  if (rating == 3) {
    title = "Very Good 😁";
  }
  if (rating == 4) {
    title = "Excellent 😍";
  }

  const onSubmitDelivery = () => {
    const payload = {
      ReviewType: "Delivery Review",
      reviewTitle: title,
      review_description: description,
      stars: rating,
      user_id: data?.user_id,
      order_id: data?.id,
    };
    review.mutate(payload);
    setDescription(false);
  };

  const onSubmitHotel = () => {
    const payload = {
      ReviewType: "Food Review",
      reviewTitle: title,
      review_description: description,
      stars: rating,
      user_id: data?.user_id,
      order_id: data?.id,
    };
    review.mutate(payload);
    if (review.isSuccess) {
      navigate.goBack();
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          marginTop: 240,
          alignItems: "center",
          marginBottom: 50,
        }}>
        <Text style={styles.hotel}>Hotel Annapoorna</Text>
        <View style={styles.container}>
          <View style={styles.greenDot} />
          <Text style={styles.greenText}>Order Delivered</Text>
        </View>
        <Text style={styles.rateTitle}>
          {reviewType == 0
            ? "Please Rate Delivery Service"
            : "How was your last order from Annapoorna ?"}
        </Text>
        <StarRatingComponent rating={rating} setRating={setRating} />
        <TextInput
          style={styles.textArea}
          placeholder="Write review here..."
          value={description}
          onChange={(event) => setDescription(event.nativeEvent.text)}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <HalfBottomButton
        title={"Submit"}
        handleClick={reviewType == 0 ? onSubmitDelivery : onSubmitHotel}
        width={"45%"}
      />
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
    justifyContent: "center",
    position: "absolute",
    bottom: -230, // Position at the bottom
    width: 108,
    height: 108,
    backgroundColor: "white",
    borderRadius: 100,
    left: "50%",
    transform: [{ translateX: -54 }], // Center horizontally
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
