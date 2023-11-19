import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";

import Colors from "@/constants/Colors";
import useBasketStore from "@/store/basketStore";

import ConfettiCannon from "react-native-confetti-cannon";
import SwipeableRow from "@/components/SwipeableRow";

import HalfBottomButton from "@/components/Buttons/HalfBottomButton";

const Basket = () => {
  const { products, total, whiteuceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const navigation = useNavigation();
  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  function nav() {
    navigation.goBack();
  }

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}
      {order && (
        <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
            Thank you for your order!
          </Text>
          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.orderBtn}>
              <Text style={styles.footerText}>New order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
      {!order && (
        <>
          {products.length > 0 ? (
            <FlatList
              style={{ backgroundColor: "white" }}
              data={products}
              ListHeaderComponent={<Text style={styles.section}>Items</Text>}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.grey,
                  }}
                />
              )}
              renderItem={({ item }) => (
                <SwipeableRow onDelete={() => whiteuceProduct(item)}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: 18,
                        fontWeight: "700",
                      }}>
                      {item.quantity}x
                    </Text>
                    <Text style={{ flex: 1, fontSize: 18, fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                      ₹{item.price * item.quantity}
                    </Text>
                  </View>
                </SwipeableRow>
              )}
              ListFooterComponent={
                <View>
                  <View
                    style={{ height: 1, backgroundColor: Colors.grey }}></View>
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Subtotal</Text>
                    <Text style={{ fontSize: 18 }}>₹{total}</Text>
                  </View>

                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Service fee</Text>
                    <Text style={{ fontSize: 18 }}>₹{FEES.service}</Text>
                  </View>

                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Delivery fee</Text>
                    <Text style={{ fontSize: 18 }}>₹{FEES.delivery}</Text>
                  </View>

                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Order Total</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      ₹{(total + FEES.service + FEES.delivery).toFixed(2)}
                    </Text>
                  </View>
                </View>
              }
            />
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={styles.emptyIllustration}
                source={require("@/assets/images/empty-basket.png")}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}>
                Basket is Empty
              </Text>
            </View>
          )}
          {products.length > 0 ? (
            <HalfBottomButton
              title={"Order-Now"}
              nav={"/razorpay"}
              orderTotal={(total + FEES.service + FEES.delivery).toFixed(2)}
              width={"45%"}
            />
          ) : (
            <HalfBottomButton
              title="Order Now"
              handleClick={nav}
              width={"45%"}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "white",
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIllustration: {
    width: 300,
    height: 300,
  },
  paymentBtn: {
    flex: 0.15,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 10,
    backgroundColor: Colors.lightGrey,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  total: {
    fontSize: 18,
    flex: 1,
  },
  linkFooter: {
    flex: 0.3,
    borderWidth: 5,
    borderRadius: 20,
    width: "100%",
  },
  footer: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    flex: 0.3,
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Basket;
