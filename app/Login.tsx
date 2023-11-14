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
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const { setToken } = useBasketStore();

  const checkName = !/^[A-Za-z\s]+$/.test(name);
  const checkEmail = !/^\S+@\S+\.\S+$/.test(email);
  const checkPhoneNumber = !/^\d+$/.test(phoneNumber);
  const checkOtp = !/^\d+$/.test(otp);
  const checkVerification = !/^\d+$/.test(verificationCode);

  const handleSignIn = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setOtpError("");

    if (checkName) {
      setNameError("Invalid name");
    }

    if (checkEmail) {
      setEmailError("Invalid email address");
    }

    if (checkPhoneNumber) {
      setPhoneNumberError("Invalid phone number");
    }

    if (checkOtp) {
      setOtpError("Invalid OTP");
      return;
    }

    async function save() {
      await SecureStore.setItemAsync("token", "token");
    }
    if (!checkPhoneNumber && !checkOtp) {
      save();
    }
    async function getValueFor() {
      let result = await SecureStore.getItemAsync("token");
      if (result) {
        setToken(result);
      }
    }
    getValueFor();
  };

  const handleSubmit = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setVerificationCode("");

    if (checkName) {
      setNameError("Invalid name");
    }

    if (checkEmail) {
      setEmailError("Invalid email address");
    }

    if (checkPhoneNumber) {
      setPhoneNumberError("Invalid phone number");
    }

    if (checkVerification) {
      setVerificationCodeError("Verification code is required");
    }

    if (!checkName && !checkEmail && !checkPhoneNumber && !checkOtp) {
      save();
    }

    async function save() {
      await SecureStore.setItemAsync("token", otp);
    }

    async function getValueFor() {
      let result = await SecureStore.getItemAsync("token");
      if (result) {
        setToken(result);
      }
    }
    getValueFor();
  };
  const handleSubmitForCreate = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setVerificationCode("");
    setVerificationCodeError("");

    if (checkName) {
      setNameError("Invalid name");
    }

    if (checkEmail) {
      setEmailError("Invalid email address");
    }

    if (checkPhoneNumber) {
      setPhoneNumberError("Invalid phone number");
    }

    if (checkVerification) {
      setVerificationCodeError("Verification code is required");
    }

    if (!checkName && !checkEmail && !checkPhoneNumber && !checkVerification) {
      save();
    }

    async function save() {
      await SecureStore.setItemAsync("token", "token");
    }

    async function getValueFor() {
      let result = await SecureStore.getItemAsync("token");
      if (result) {
        setToken(result);
      }
    }
    getValueFor();
  };

  const handleCreateAccount = () => {
    setIsRegistering(true);
    setNameError("");
    setEmailError("");
    setPhoneNumber("");
    setPhoneNumberError("");
  };

  const handleVerify = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setVerificationCode("");
    if (checkName) {
      setNameError("Invalid name");
    }

    if (checkEmail) {
      setEmailError("Invalid email address");
    }

    if (checkPhoneNumber) {
      setPhoneNumberError("Invalid phone number");
    }

    if (!checkName && !checkEmail && !checkPhoneNumber) {
      setIsVerifying(true);
      setIsRegistering(true);
    }
  };

  const handleBack = () => {
    setIsRegistering(false);
    setIsVerifying(false);
    setPhoneNumberError("");
    setOtpError("");
    setOtp("");
    setPhoneNumber("");
    setEmail("");
    setName("");
  };

  return (
    <View style={styles.container}>
      {isRegistering ? (
        // Registration Section
        <View>
          {isRegistering ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="black" mb={-2} />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>Create Account:</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          {phoneNumberError && (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          )}

          {isVerifying ? (
            <View>
              <Text style={styles.title}>Verification Code:</Text>
              <Text style={styles.subTitle}>
                Please type the verification code sent to{" "}
                <Text style={{ fontWeight: "800" }}>9876543210</Text>
              </Text>
              <TextInput
                style={styles.verifyInput}
                placeholder="Verification Code"
                onChangeText={(text) => setVerificationCode(text)}
              />
              {verificationCodeError && (
                <Text style={styles.errorText}>Invalid Verification code </Text>
              )}

              <Text style={styles.subTitle}>
                Don't receive a code !{" "}
                <Text style={{ fontWeight: "800" }}>Please resend.</Text>
              </Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={isVerifying ? handleSubmitForCreate : handleSubmit}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.createAccountText} onPress={handleBack}>
                Already have an account?{" "}
                <Text style={{ fontWeight: "800" }}>Sign In</Text>
              </Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}
              >
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
              <Text style={styles.createAccountText} onPress={handleBack}>
                Already have an account ?
                <Text style={{ fontWeight: "800" }}> Sign In</Text>
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
            {phoneNumberError && (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={otp}
              onChangeText={(text) => setOtp(text)}
            />
            {otpError && <Text style={styles.errorText}>{otpError}</Text>}
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.createAccountText} onPress={handleCreateAccount}>
            Don't have an account ?
            <Text style={{ fontWeight: "800" }}> Create One</Text>
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
    marginTop: 20,
    marginBottom: 6,
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
    marginTop: 20,
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 8,
  },
});

export default LoginScreen;
