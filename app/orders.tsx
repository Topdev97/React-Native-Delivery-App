import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import moment from "moment";
import Colors from "@/constants/Colors";

import { useNavigation } from "@react-navigation/native";
import { getUserSpecifiedOrders } from "@/core/services/home";

import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import Loading from "@/components/Pages/Loading";

export default function OrderHistory() {
  const navigation = useNavigation();
  let fullwidth = Dimensions.get("window").width;

  const userOrders = getUserSpecifiedOrders({});

  return (
    <>
      {userOrders.isLoading ? (
        <Loading />
      ) : (
        <>
          {userOrders?.data?.orders?.length < 0 ? (
            <EmptyIllustration />
          ) : (
            <ScrollView style={styles.container}>
              {userOrders?.data?.orders?.map((item, i) => {
                const indianDateTime = moment
                  .utc(item?.created_at)
                  .utcOffset("+05:30");
                const date = indianDateTime.format("YYYY-MM-DD");
                const time = indianDateTime.format("hh:mm A");
                return (
                  <View style={{ paddingVertical: 0 }} key={i}>
                    <View
                      style={{
                        ...styles.orderContainer,
                        width: fullwidth - 20,
                      }}>
                      <View style={styles.flex}>
                        <Text style={styles.title}>
                          {item?.Items.length > 1
                            ? `${item?.Items?.[0]?.name} + ${
                                item?.Items.length - 1
                              } Items`
                            : item?.Items?.[0]?.name}
                        </Text>
                        <Text style={styles.title}> ₹{item?.bill_total}</Text>
                      </View>

                      <View style={{ ...styles.flex, paddingTop: 6 }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "800",
                              color: "#666",
                            }}>
                            Order ID #000{item?.id}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "800",
                              color: "#666",
                            }}>
                            {date} at {time}
                          </Text>
                        </View>
                        <Text
                          style={{
                            ...styles.tag,
                            backgroundColor:
                              item.orderStatus == "delivered"
                                ? Colors.green
                                : item.orderStatus == "cancelled"
                                ? "red"
                                : Colors.primary,
                          }}>
                          {item?.orderStatus == "new"
                            ? "Accepted"
                            : item?.orderStatus.charAt(0).toUpperCase() +
                              item?.orderStatus.slice(1)}
                        </Text>
                      </View>

                      <View style={styles.buttonContainer}>
                        {/* {item.orderStatus === "cancelled" && (
                      <View
                        style={{
                          width: fullwidth / 2.5,
                          height: 42,
                          ...styles.button,
                        }}>
                        <Link
                          href={{
                            pathname: "/razorpay",
                            params: { orderTotal: item?.bill_total },
                          }}
                          style={styles.link}>
                          <Icon
                            name={"refresh-outline"}
                            size={20}
                            color={Colors.tranparentButtonColor}
                            mb={10}
                          />
                          <Text style={styles.buttonText}>Reorder</Text>
                        </Link>
                      </View>
                    )} */}
                        {item.orderStatus === "delivered" && (
                          <>
                            <View
                              style={{
                                width: "100%",
                                height: 42,
                                ...styles.button,
                              }}>
                              <Pressable
                                onPress={() => {
                                  navigation.navigate("review", {
                                    data: JSON.stringify(item),
                                  });
                                  navigation.canGoBack(true);
                                }}
                                style={styles.link}>
                                <Text style={styles.buttonText}>
                                  Rate Order
                                </Text>
                              </Pressable>
                            </View>
                          </>
                        )}
                        {(item.orderStatus === "preparing" ||
                          item.orderStatus === "new" ||
                          item.orderStatus === "ready" ||
                          item.orderStatus === "picked" ||
                          item.orderStatus === "cancelled") && (
                          <View
                            style={{
                              width: "100%",
                              height: 42,
                              ...styles.button,
                            }}>
                            <Pressable
                              onPress={() => {
                                navigation.navigate("trackOrder", {
                                  data: JSON.stringify(item),
                                });
                                navigation.canGoBack(true);
                              }}
                              style={styles.link}>
                              <Text style={styles.buttonText}>
                                {" "}
                                {item.orderStatus === "cancelled"
                                  ? "View"
                                  : "Track"}{" "}
                                Order
                              </Text>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </>
      )}
    </>
  );
}

function EmptyIllustration() {
  const navigation = useNavigation();
  function nav() {
    navigation.goBack();
    navigation.goBack();
  }
  return (
    <>
      <View style={styles.emptyContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.emptyIllustration}
            source={require("@/assets/images/deliveryboy.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            You don't have any order history
          </Text>
        </View>
        <View style={{ flex: 2, width: "100%" }}>
          <HalfBottomButton title="Order Now" handleClick={nav} width={"50%"} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  emptyContainer: {
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f6f7",
    marginBottom: 10,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 15,
    paddingBottom: 20,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    height: 40,
    alignItems: "center",
  },
  button: {
    borderColor: Colors.medium,
    borderWidth: 1,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  link: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    color: Colors.tranparentButtonColor,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    fontSize: 15,
    fontWeight: "800",
  },
  price: { fontSize: 14, fontWeight: "600", paddingBottom: 10 },
  tag: {
    margin: 0,
    textAlign: "center",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "700",
  },
  bottomButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    width: "50%",
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
  },
  logoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
