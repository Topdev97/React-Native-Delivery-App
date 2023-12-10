import React from "react";
import Colors from "@/constants/Colors";

import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.containerForLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
