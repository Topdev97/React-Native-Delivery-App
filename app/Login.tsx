import Colors from "@/constants/Colors";
import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useBasketStore from "@/store/basketStore";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { token, setToken } = useBasketStore();

  const handleSignIn = () => {
    async function save() {
      await SecureStore.setItemAsync("token", otp);
    }
    async function getValueFor() {
      let result = await SecureStore.getItemAsync("token");
      if (result) {
        setToken(result);
      } else {
        alert("Invalid OTP");
      }
    }
    save();
    getValueFor();
    console.log("Signing in with Phone Number:", phoneNumber, "OTP:", otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText}>
        Don't have an account? Create one.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
  },
  createAccountText: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
  },
});

export default LoginScreen;
