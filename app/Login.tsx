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
import utils, { Icon } from "@/constants/utils";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { setToken } = useBasketStore();

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

  const handleCreateAccount = () => {
    setIsRegistering(true);
  };
  {
    utils.fullheight;
  }

  const handleVerify = () => {
    setIsVerifying(true);
    setIsRegistering(true);
  };
  const handleBack = () => {
    setIsRegistering(false);
    setIsVerifying(false);
  };
  return (
    <View style={styles.container}>
      {isRegistering ? (
        // Registration Section
        <View>
          {isRegistering ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>Create Account:</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          {isVerifying ? (
            // Verification Section
            <View>
              <Text style={styles.title}>Verification Code:</Text>
              <Text style={styles.subTitle}>
                Please type the verification code sent to 9876543210
              </Text>
              <TextInput
                style={styles.verifyInput}
                placeholder="Verification Code"
                value={verificationCode}
                onChangeText={(text) => setVerificationCode(text)}
              />
              <Text style={styles.subTitle}>
                Don't receive a code! Please resend.
              </Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSignIn}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.createAccountText} onPress={handleBack}>
                Already have an account? Sign In
              </Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}>
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
              <Text style={styles.createAccountText} onPress={handleBack}>
                Already have an account? Sign In
              </Text>
            </>
          )}
        </View>
      ) : (
        // Sign-In Section
        <View>
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
          <Text style={styles.createAccountText} onPress={handleCreateAccount}>
            Don't have an account? Create one.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: "black",

    marginBottom: 12,
  },
  subTitle: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginHorizontal: utils.fullwidth / 6,
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
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginHorizontal: utils.fullwidth / 6,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
  },
  verifyInput: {
    backgroundColor: "white",
    height: 50,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginHorizontal: utils.fullwidth / 6,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: -utils.fullheight / 3.8,
    left: -8,
  },
});

export default LoginScreen;
