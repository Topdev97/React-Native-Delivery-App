import React from "react";
import Colors from "@/constants/Colors";

import { Icon } from "@/constants/utils";
import { FontAwesome } from "@expo/vector-icons";

import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";

import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigation } from "expo-router";

import { useEffect } from "react";
import { HeaderReview } from "./review";

import * as SecureStore from "expo-secure-store";
import LoginScreen from "./Login";

import useBasketStore from "@/store/basketStore";
import QueryClient from "@/core/lib/QueryClient";

import * as Device from "expo-device";
import { Platform } from "react-native";

import * as Notifications from "expo-notifications";
import { setAuthHeader } from "@/core/lib/AxiosClient";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const { token, setToken, products, setProducts, addProduct } =
    useBasketStore();

  let result;
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    async function getValueFor() {
      result = await SecureStore.getItemAsync("token");
      if (result) {
        setToken(result);
        setAuthHeader(result);
      }
    }
    getValueFor();
  }, [result, token]);

  // Set Initial Basket
  useEffect(() => {
    async function basketSet() {
      result = await SecureStore.getItemAsync("basket");
      if (result) {
        const data = JSON.parse(result);
        setProducts(data);
        data.map((obj: any) => {
          return addProduct(obj);
        });
      }
    }
    basketSet();
  }, []);

  // Set Basket
  useEffect(() => {
    async function basketSet(products: any) {
      const data = JSON.stringify(products);
      await SecureStore.setItemAsync("basket", data);
    }

    basketSet(products);
  }, [products]);

  if (!loaded) {
    return null;
  }

  return token ? <RootLayoutNav /> : <LoginScreenWithQueryClient />;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
function RootLayoutNav() {
  const navigation = useNavigation();
  // Notification Setup
  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log(existingStatus);

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "42cdfbfe-dd38-4312-98bd-32808f5c81cc",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    return token;
  }

  return (
    <QueryClient>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              presentation: "modal",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/location-search"
            options={{
              presentation: "fullScreenModal",
              headerTitle: "Select location",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/dish"
            options={{
              presentation: "modal",
              headerTitle: "",
              headerTransparent: true,

              headerLeft: () => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 6,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="basket"
            options={{
              headerTitle: "Basket",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="razorpay"
            options={{
              headerTitle: "Payments",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="menus"
            options={{
              headerTitle: "Account",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerTitle: "Edit Profile",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="address"
            options={{
              headerTitle: "Address",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="orders"
            options={{
              headerTitle: "Orders",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="orderDetails"
            options={{
              headerTitle: "Order-Details",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="review"
            options={{
              header: () => <HeaderReview />,
            }}
          />
          <Stack.Screen
            name="trackOrder"
            options={{
              headerTitle: "Track Order",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="search-page"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="category-menu"
            options={{
              headerTitle: "Category Menu",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </QueryClient>
  );
}

function LoginScreenWithQueryClient() {
  return (
    <QueryClient>
      <LoginScreen />
    </QueryClient>
  );
}
