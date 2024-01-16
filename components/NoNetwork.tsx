import React from "react";
import Colors from "@/constants/Colors";

import { Icon } from "@/constants/utils";
import { SafeAreaView } from "react-native";

import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoNetwork = (props: any) => {
  const { NetInfo, setNetwork } = props;

  function handleClick() {
    NetInfo.fetch().then((state: any) => {
      console.log("Is connected?", state.isConnected);
      setNetwork(state.isConnected);
    });
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <Image
          style={styles.emptyIllustration}
          source={{
            uri: "https://cdni.iconscout.com/illustration/premium/thumb/no-connection-2130358-1800922.png?f=webp",
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 30,
          }}>
          No Internet Connection !
        </Text>
        <View style={{ width: "40%" }}>
          <TouchableOpacity
            style={{ ...styles.logoutButton }}
            onPress={handleClick}>
            <View style={styles.logoutButtonContent}>
              <Icon name={"reload"} size={18} color={Colors.primary} />
              <Text style={styles.logoutButtonText}>Retry</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIllustration: {
    width: "100%",
    height: 250,
  },
  logoutButton: {
    backgroundColor: Colors.primaryBg,
    width: "100%",
    padding: 15,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100,
  },
  logoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginLeft: 8,
  },
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
});

export default NoNetwork;
