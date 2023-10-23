import HalfBottomButton from "@/components/Buttons/HalfBottomButton";
import Colors from "@/constants/Colors";
import { Icon } from "@/constants/utils";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

export default function AddressForm() {
  const [formData, setFormData] = useState({
    houseNo: "87",
    street: "kutty streeet",
    area: "Paniputhure",
    landmark: "near rason kadai",
    city: "tenkasi",
    state: "tamilnadu",
    pincode: "600128",
  });

  const [editMode, setEditMode] = useState(false);

  const editButtonRef = useRef(null);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to the server
    console.log("Form data:", formData);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentAddress}>
        {editMode ? "Edit Address" : "Delivery Address"}
      </Text>
      <Text style={styles.currentAddressText}>
        {formData.houseNo}, {formData.street}, {formData.area},{" "}
        {formData.landmark}, {formData.city}, {formData.state} -{" "}
        {formData.pincode}
      </Text>
      {editMode && (
        <View style={styles.formGroup}>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>House No:</Text>
            <TextInput
              style={styles.input}
              value={formData.houseNo}
              onChangeText={(text) => handleChange("houseNo", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Street:</Text>
            <TextInput
              style={styles.input}
              value={formData.street}
              onChangeText={(text) => handleChange("street", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Area:</Text>
            <TextInput
              style={styles.input}
              value={formData.area}
              onChangeText={(text) => handleChange("area", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Landmark:</Text>
            <TextInput
              style={styles.input}
              value={formData.landmark}
              onChangeText={(text) => handleChange("landmark", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>City:</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => handleChange("city", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>State:</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={(text) => handleChange("state", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Pincode:</Text>
            <TextInput
              style={styles.input}
              value={formData.pincode}
              onChangeText={(text) => handleChange("pincode", text)}
            />
          </View>
        </View>
      )}

      {editMode ? (
        <HalfBottomButton title="Save" handleClick={handleSubmit} />
      ) : (
        <Pressable style={styles.editButton} onPress={handleEditClick}>
          <Text style={styles.text}>
            <Icon name="create-outline" size={20} />
            Edit
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
  },
  currentAddress: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
  },
  currentAddressText: {
    fontSize: 16,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 10,
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
  editButton: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
