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
  ToastAndroid,
  Alert,
} from "react-native";
import useBasketStore from "@/store/basketStore";
import {
  createAddress,
  getUserInfo,
  updateUserAddress,
} from "@/core/services/home";
import { useQueryClient } from "@tanstack/react-query";
import { queries } from "@/core/constants/queryKeys";
import Loading from "@/components/Pages/Loading";
import useCommonStore from "@/store/commonStore";

export default function AddressForm() {
  const [formData, setFormData] = useState();

  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);

  const user = getUserInfo({});
  const { currentLocation, setCurrentLocation } = useBasketStore();

  const { geoPoint } = useCommonStore();

  const addressMutate = updateUserAddress({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.home.userAddress.queryKey,
      });
      ToastAndroid.showWithGravity(
        "Address updated successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    },
  });

  const newAddress = createAddress({
    onSuccess: (data: any) => {
      setFormData(data);
      queryClient.invalidateQueries({
        queryKey: queries.home.userAddress.queryKey,
      });
      ToastAndroid.showWithGravity(
        "Address added successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    },
  });

  const handleChange = (key: any, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    const hnumber = Number(formData?.house_no);
    if (!geoPoint.lat && !geoPoint.lon) {
      Alert.alert(
        "Alert",
        `Please choose your Geo Location by clicking the "Select on Map"`,
        [{ text: "Ok", style: "cancel" }],
        { cancelable: false }
      );
    } else {
      newAddress.mutate({
        house_no: hnumber,
        user_id: user?.data?.id,
        address_type: "Home",
        ...geoPoint,
        ...formData,
      });
      setEditMode(false);
    }
  };

  const handleUpdate = () => {
    const hnumber = Number(formData?.house_no);
    delete formData?.user_id;

    addressMutate.mutate({
      Address: { house_no: hnumber, ...formData },
    });
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const onMapPress = () => {
    if (currentLocation) {
      const url = `https://www.google.com/maps?q=${currentLocation}`;

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          null;
        }
      });
    } else if (!currentLocation) {
      getLocation();
    }
  };

  const fetchGeoData = async (latitude: any, longitude: any) => {
    setCurrentLocation(`${latitude},${longitude}`);
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

  useEffect(() => {
    if (!formData) setFormData(user?.data?.Address?.[0]);
  }, [user?.data]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      {user.isLoading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.currentAddress}>
            {editMode ? "Edit Address" : "Delivery Address"}
          </Text>
          <Text style={styles.currentAddressText}>
            {user?.data?.Address?.length <= 0 ? (
              editMode ? (
                "Add Your Address"
              ) : (
                "Click Here to Add Your Address 👇"
              )
            ) : (
              <>
                {formData?.house_no}, {formData?.street_address},{" "}
                {formData?.area}, {formData?.landmark}, {formData?.city},
                {formData?.state}-{formData?.pincode}.
              </>
            )}
          </Text>
          {editMode && (
            <View style={styles.formGroup}>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>House No:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={formData?.house_no?.toString() || ""}
                  onChangeText={(text) =>
                    handleChange("house_no", Number(text))
                  }
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Street:</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.street_address || ""}
                  onChangeText={(text) => handleChange("street_address", text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Area:</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.area || ""}
                  onChangeText={(text) => handleChange("area", text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Landmark:</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.landmark || ""}
                  onChangeText={(text) => handleChange("landmark", text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>City:</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.city || ""}
                  onChangeText={(text) => handleChange("city", text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>State:</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.state || ""}
                  onChangeText={(text) => handleChange("state", text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Pincode :</Text>
                <TextInput
                  style={styles.input}
                  value={formData?.pincode || ""}
                  onChangeText={(text) => handleChange("pincode", text)}
                />
              </View>
              {/* GEO LOCATION */}
              <View style={styles.formGroup}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View>
                    <Text
                      style={{
                        ...styles.inputLabel,
                        textAlign: "center",
                        fontWeight: "800",
                        fontSize: 16,
                        color: "black",
                      }}>
                      Geolocation
                    </Text>
                    <Link<{ pathname: any; params: { id: any } }>
                      href={{
                        pathname: "/(modal)/location-search",
                        params: { id: formData?.id || "" },
                      }}
                      style={{ marginBottom: 4, marginTop: 6 }}>
                      <Text
                        style={{
                          ...styles.inputLabel,
                          color: "#0000EE",
                          fontWeight: "800",
                          fontSize: 16,
                        }}
                        onPress={onMapPress}
                        disabled={true}>
                        Click Below to Set Your Map Location
                      </Text>
                    </Link>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}>
                    <Link<{ pathname: any; params: { id: any } }>
                      href={{
                        pathname: "/(modal)/location-search",
                        params: { id: formData?.id || "" },
                      }}
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        marginRight: 10,
                      }}>
                      <Text style={styles.editText}>Select on Map </Text>
                      <Icon name="location" size={20} color={Colors.primary} />
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          )}

          {editMode ? (
            <HalfBottomButton
              title={user?.data?.Address?.length <= 0 ? "Submit" : "Update"}
              handleClick={
                user?.data?.Address?.length <= 0 ? handleSubmit : handleUpdate
              }
              width={"45%"}
            />
          ) : (
            <Pressable style={styles.editButton} onPress={handleEditClick}>
              <Text style={styles.text}>
                <Icon name="create-outline" size={20} />
                {user?.data?.Address?.length < 0 ? "Add" : "Edit"}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      )}
    </View>
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
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
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
