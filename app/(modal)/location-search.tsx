import Colors from "@/constants/Colors";
import * as Location from "expo-location";

import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useBasketStore from "@/store/basketStore";

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<any>({
    latitude: 13.0832,
    longitude: 80.2755,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [loading, setLoading] = useState<any>(false);
  const { currentLocation, setCurrentLocation } = useBasketStore();

  const fetchGeoData = async (latitude: any, longitude: any) => {
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
    setLoading(false);
  };

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        fetchGeoData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setLoading(true);
        console.error("Error requesting location permission:", error);
      }
    };
    getLocation();
  }, []);

  function onPressConfirm() {
    setCurrentLocation(location);
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry?.location;
          if (!point) {
            console.error("Location details not found:", data);
            return;
          }
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        onFail={(error: any) => console.error("Autocomplete Error:", error)}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: "#fff",
          },
        }}
      />

      <MapView showsUserLocation={true} style={styles.map} region={location}>
        <Marker
          draggable={true}
          coordinate={location}
          onDragEnd={(e) => {
            setLocation({
              ...location,
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}>
          <Callout>
            <Text>Long press this marker to change Location</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={onPressConfirm}>
          {loading ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}>
              <Text style={styles.buttonTextLoading}>Loading</Text>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Text style={styles.buttonText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 100,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextLoading: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginRight: 6,
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default LocationSearch;
