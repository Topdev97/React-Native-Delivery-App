import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

import * as Location from "expo-location";
import Colors from "@/constants/Colors";

import { Icon } from "@/constants/utils";
import HalfBottomButton from "@/components/Buttons/HalfBottomButton";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
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
    latitude: "",
    longitude: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState<any>();

  const handleChange = (key: any, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const onMapPress = () => {
    if (location) {
      const url = `https://www.google.com/maps?q=${location}`;

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Google Maps is not available");
          // You might want to handle this case by, for example, opening a browser with the same URL
        }
      });
    } else if (!location) {
      getLocation();
    }
  };

  // const openDirectionsInGoogleMaps = () => {
  //   const destination = `13.067439,80.237617`;
  //   const url = `https://www.google.com/maps/dir/?api=1&origin=${location}&destination=${destination}`;
  //   console.log(url);

  //   Linking.canOpenURL(url).then((supported) => {
  //     if (supported) {
  //       Linking.openURL(url);
  //     } else {
  //       console.log("Google Maps is not available");
  //     }
  //   });
  // };

  const fetchGeoData = async (latitude: any, longitude: any) => {
    setLocation(`${latitude},${longitude}`);
    handleChange("latitude", latitude);
    handleChange("longitude", longitude);
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchGeoData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
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
            <Text style={styles.inputLabel}>Pincode :</Text>
            <TextInput
              style={styles.input}
              value={formData.pincode}
              onChangeText={(text) => handleChange("pincode", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.inputLabel,
                    textAlign: "center",
                    fontWeight: "800",
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  Geolocation
                </Text>
                <Text
                  style={{
                    ...styles.inputLabel,
                    color: "#0000EE",
                    marginBottom: 12,
                    marginTop: 6,
                  }}
                  onPress={onMapPress}
                >
                  {location ? location : "Not selected"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderRightColor: "#979797",
                    borderRightWidth: 1,
                    paddingRight: 5,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      ...styles.editText,
                    }}
                    onPress={getLocation}
                  >
                    Use Current Location{" "}
                  </Text>
                  <Icon
                    name="location-sharp"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <Link href={"/(modal)/location-search"}>
                  <Text style={{ ...styles.editText }}>Select on Map </Text>
                  <Icon name="map" size={20} color={Colors.primary} />
                </Link>
              </View>
            </View>
            {/* <HalfBottomButton
                title="Select on Map"
                // handleClick={handleClick}
                iconName="location"
              /> */}
            {/* <HalfBottomButton
              title="Directional Location"
              handleClick={openDirectionsInGoogleMaps}
            /> */}
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
  editText: {
    color: "#9796A1",
    fontSize: 18,
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
