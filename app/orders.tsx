import Colors from "@/constants/Colors";
import { Icon } from "@/constants/utils";
import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

export default function OrderHistory() {
  let fullwidth = Dimensions.get("window").width;
  const orders = [
    {
      orderId: "#686876",
      status: "Prepared",
      date: "2023-10-15",
      time: "15:30",
      orderPrice: 50.0,
      title: "Briyani with 65",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    {
      orderId: 2,
      status: "Cancelled",
      date: "2023-10-10",
      time: "12:45",
      orderPrice: 25.0,
      title: "Veg Briyani with 65",
      items: ["Item 4", "Item 5"],
    },
    {
      orderId: 3,
      status: "Delivered",
      date: "2023-10-5",
      time: "18:15",
      orderPrice: 70.0,
      title: "Paroda",
      items: ["Item 6", "Item 7", "Item 8"],
    },
  ];

  const handleRate = (order: any) => {
    console.log(`Rating order ${order.orderId}`);
  };

  const handleReorder = (order: any) => {
    console.log(`Reordering order ${order.orderId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {orders.map((item, i) => (
        <View style={{ paddingVertical: 0 }} key={i}>
          <View style={{ ...styles.orderContainer, width: fullwidth - 20 }}>
            <View style={styles.flex}>
              <Text style={styles.title}>{item.title}...</Text>
              <Text style={styles.title}> ₹{item.orderPrice}</Text>
            </View>

            <View style={{ ...styles.flex, paddingTop: 6 }}>
              <View>
                <Text>Order {item.orderId}</Text>
                <Text>
                  {item.date} at {item.time}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.tag,
                  backgroundColor:
                    item.status == "Delivered" ? Colors.primary : Colors.medium,
                }}>
                {item.status}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              {item.status != "Prepared" && (
                <View
                  style={{
                    width: fullwidth / 2.5,
                    height: 42,
                    ...styles.button,
                  }}>
                  <Link
                    href={{
                      pathname: "/razorpay",
                      params: { orderTotal: item.orderPrice },
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
              )}
              {item.status == "Delivered" && (
                <View
                  style={{
                    width: fullwidth / 2.5,
                    height: 42,
                    ...styles.button,
                  }}>
                  <Link
                    href={{
                      pathname: "/review",
                      params: { orderTotal: item.orderPrice },
                    }}
                    style={styles.link}>
                    <Icon
                      name={"star-outline"}
                      size={20}
                      color={Colors.tranparentButtonColor}
                      mb={10}
                    />
                    <Text style={styles.buttonText}> Rate Order</Text>
                  </Link>
                </View>
              )}
              {item.status == "Prepared" && (
                <View
                  style={{
                    width: fullwidth - 50,
                    height: 42,
                    ...styles.button,
                  }}>
                  <Link
                    href={{
                      pathname: "/trackOrder",
                      params: { orderTotal: item.orderPrice },
                    }}
                    style={styles.link}>
                    <Icon
                      name={"star-outline"}
                      size={20}
                      color={Colors.tranparentButtonColor}
                      mb={10}
                    />
                    <Text style={styles.buttonText}> Track Order</Text>
                  </Link>
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f6f7",
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
    fontSize: 15,
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
  },
  button: {
    borderColor: Colors.medium,
    borderWidth: 1,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
  },
  link: {
    height: 24,
  },
  buttonText: {
    padding: 5,
    color: Colors.tranparentButtonColor,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 14,
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
