import Colors from "@/constants/Colors";
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import SwipeableRow from "@/components/SwipeableRow";

import { FlatList } from "react-native-gesture-handler";
import useBasketStore from "@/store/basketStore";

import { AntDesign } from "@expo/vector-icons";

const OrderTrackingScreen = () => {
  const ordersData = [
    { orderId: 1, productName: "Product A", status: "Shipped", step: 1 },
    { orderId: 2, productName: "Product B", status: "Delivered", step: 2 },
    // Add more orders as needed
  ];

  const progressStepsobj = {
    activeStepIconBorderColor: Colors.primary,
    activeLabelColor: Colors.primary,
    activeStep: 1,
    completedLabelColor: Colors.dark,
    completedStepIconColor: Colors.primary,
    completedProgressBarColor: Colors.primary,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.addressContainer}>
        <Text style={styles.currentAddress}>Delivery Address</Text>
        <Text style={styles.currentAddressText}>
          87 kutty street Paraniputhure, near rason
          kadai,tenkasi,tamilnadu-600128
        </Text>
      </View>
      <View style={styles.orderStatusContainer}>
        <Text style={styles.orderStatus}>
          Order status :
          <Text style={styles.orderStatusSubText}> Preparing</Text>
        </Text>
        <Text style={styles.orderStatus}>
          ETA:
          <Text style={styles.orderStatusSubText}> 25 Min</Text>
        </Text>
      </View>
      <View style={{ height: 125 }}>
        <ProgressSteps {...progressStepsobj}>
          <ProgressStep
            label="Accepted"
            nextBtnTextStyle={{}}
            previousBtnText=""
          />
          <ProgressStep label="Preparing" nextBtnText="" previousBtnText="" />
          <ProgressStep label="On the way" nextBtnText="" previousBtnText="" />
          <ProgressStep label="Delivered" nextBtnText="" previousBtnText="" />
        </ProgressSteps>
      </View>

      <View style={styles.orderDetailContainer}>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Order Id</Text>
          <Text style={styles.orderSubtext}>#1212121212</Text>
        </View>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Date</Text>
          <Text style={styles.orderSubtext}>July 2 2023 02:00 Am </Text>
        </View>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Payment Status</Text>
          <Text style={styles.orderSubtext}>Success </Text>
        </View>
      </View>
      <Drawer />
      <View style={{ marginBottom: 20 }}>
        <HalfBottomButton title="Contact" />
      </View>
    </ScrollView>
  );
};

const Drawer = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const { products, total, reduceProduct } = useBasketStore();

  const toggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleContent}>
        <View style={styles.headingContainer}>
          <Text style={styles.section}>Order Items</Text>
          <AntDesign
            name={isContentVisible ? "up" : "down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {isContentVisible && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={products}
            // ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
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
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },
  addressContainer: {
    borderColor: "#C7C7C9",
    borderBottomWidth: 1,
  },
  currentAddress: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 5,
  },
  currentAddressText: {
    fontSize: 16,
    marginBottom: 20,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderStatusSubText: {
    fontSize: 16,
    fontWeight: "800",
  },
  orderStatusContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fcfcfc",
  },
  orderDetailContainer: {
    borderColor: "#C7C7C9",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  justBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
  linkFooter: {
    flex: 0.3,
    borderWidth: 5,
    borderRadius: 20,
    width: "100%",
  },

  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderSubtext: {
    fontSize: 16,
    fontWeight: "600",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  headingText: {
    fontSize: 18,
  },
  contentContainer: {
    padding: 16,
  },
});

export default OrderTrackingScreen;
