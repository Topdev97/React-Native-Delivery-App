import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSave = () => {
    // Implement your logic to save the updated profile details
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userProfileContainer}>
        <Image
          source={{
            uri: "https://www.themoviedb.org/t/p/w500/upKrdABAMK7jZevWAoPYI24iKlR.jpg",
          }}
          style={styles.userProfileImage}
        />
        <Text style={styles.userProfileText}>Iyappan Kandasamy</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>
      <HalfBottomButton title={"Save"} handleClick={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  inputLabel: {
    color: "#9796A1",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
  },
  userProfileContainer: {
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
    borderRadius: 100,
    backgroundColor: "white",
  },
  userProfileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  userProfileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
});
