import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";

import moment from "moment";
import Colors from "@/constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import useBasketStore from "@/store/basketStore";

import { FlatList } from "react-native-gesture-handler";
import HalfBottomButton from "@/components/Buttons/HalfBottomButton";

import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { useLocalSearchParams } from "expo-router";

const OrderTrackingScreen = () => {
  const { data } = useLocalSearchParams();
  const [step, setStep] = useState<any>(0);
  const item = JSON.parse(data);

  const makePhoneCall = () => {
    Linking.openURL(`tel:8610593462`).catch((err) =>
      console.error("Error in initiating the phone call: ", err)
    );
  };

  const progressStepsobj = {
    activeStepIconBorderColor:
      item?.orderStatus == "cancelled" ? "red" : Colors.primary,
    activeLabelColor: item?.orderStatus == "cancelled" ? "red" : Colors.primary,
    activeStep: step,
    completedLabelColor: Colors.primary,
    completedStepIconColor: Colors.primary,
    completedProgressBarColor: Colors.primary,
  };

  const orderTime = moment
    .utc(item?.created_at)
    .utcOffset("+05:30")
    .format("MMMM D YYYY hh:mm A");

  useEffect(() => {
    if (item?.orderStatus == "new") {
      setStep(0);
    }
    if (item?.orderStatus == "preparing" || item?.orderStatus == "ready") {
      setStep(1);
    }
    if (item?.orderStatus == "picked") {
      setStep(2);
    }
    if (item?.orderStatus == "delivered" || item?.orderStatus == "cancelled") {
      setStep(3);
    }
  }, [item]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.addressContainer}>
        <Text style={styles.currentAddress}>Delivery Address</Text>
        <Text style={styles.currentAddressText}>
          {item?.address?.house_no}, {item?.address?.street_address},{" "}
          {item?.address?.area}, {item?.address?.landmark},{" "}
          {item?.address?.city}, {item?.address?.state} -{" "}
          {item?.address?.pincode}
        </Text>
      </View>
      <View style={styles.orderStatusContainer}>
        <Text style={{ ...styles.orderStatus, fontWeight: "700" }}>
          Order status :
          <Text style={styles.orderStatusSubText}>
            {" "}
            {item?.orderStatus == "new"
              ? "Accepted"
              : item?.orderStatus.charAt(0).toUpperCase() +
                item?.orderStatus.slice(1)}
          </Text>
        </Text>
        {/* <Text style={styles.orderStatus}>
          ETA:
          <Text style={styles.orderStatusSubText}> 25 Min</Text>
        </Text> */}
      </View>
      <View style={{ height: 125 }}>
        <ProgressSteps {...progressStepsobj}>
          <ProgressStep label="Accepted" nextBtnText="" previousBtnText="" />
          <ProgressStep
            label={
              item?.orderStatus.charAt(0).toUpperCase() +
              item?.orderStatus.slice(1)
            }
            nextBtnText=""
            previousBtnText=""
          />
          <ProgressStep label="On the way" nextBtnText="" previousBtnText="" />
          <ProgressStep
            label={
              item?.orderStatus.charAt(0).toUpperCase() +
              item?.orderStatus.slice(1)
            }
            previousBtnText=""
            finishBtnText=""
          />
        </ProgressSteps>
      </View>

      <View style={styles.orderDetailContainer}>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Order Id</Text>
          <Text style={styles.orderSubtext}>#000{item?.id}</Text>
        </View>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Order Date</Text>
          <Text style={styles.orderSubtext}>{orderTime} </Text>
        </View>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Payment Method</Text>
          <Text style={styles.orderSubtext}>
            {item?.payment_type?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.justBetween}>
          <Text style={styles.orderStatus}>Payment Status</Text>
          <Text style={styles.orderSubtext}>
            {item?.payment_status == "true" ? "Success" : "Not Yet "}
          </Text>
        </View>
        {item?.orderStatus == "cancelled" && (
          <>
            <View style={styles.justBetween}>
              <Text style={styles.orderStatus}>Cancelled Reason:</Text>
              <Text style={styles.orderSubtext}>{!item?.reason && `-`}</Text>
            </View>
            <Text style={styles.orderSubtext}>
              {item?.reason && `# ${item?.reason}`}
            </Text>
          </>
        )}
      </View>
      <Drawer item={item} />
      <View style={{ marginVertical: 20 }}>
        <HalfBottomButton
          title="Contact"
          handleClick={makePhoneCall}
          width={"45%"}
        />
      </View>
    </ScrollView>
  );
};

const Drawer = ({ item }) => {
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
            color="#9f9aa1"
          />
        </View>
      </TouchableOpacity>
      {isContentVisible && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={item?.Items}
            // ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  {item.quantity}x
                </Text>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Text style={{ fontSize: 18 }}>
                  ₹{item.price * item.quantity}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <View>
                <View
                  style={{ height: 1, backgroundColor: Colors.grey }}></View>
                {/* <View style={styles.totalRow}>
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
                </View> */}

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Total Amount with charges</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    ₹{item?.bill_total}
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
    borderBottomWidth: 0.8,
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
    fontWeight: "800",
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
    alignItems: "center",
    marginBottom: 12,
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
    paddingVertical: 16,
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
