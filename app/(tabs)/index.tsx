import React, { useEffect } from "react";
import Colors from "@/constants/Colors";

import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";

import { getBanners, getCategories, getUserInfo } from "@/core/services/home";
import Loading from "@/components/Pages/Loading";

import Restaurants from "@/components/Restaurants";
import { Text, ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import useCommonStore from "@/store/commonStore";

const Page = () => {
  const banners = getBanners({});
  const categories = getCategories({});

  const user = getUserInfo({});
  const { setUserInfo, userInfo } = useCommonStore();

  const dataLoading =
    banners.isLoading || categories.isLoading || user.isLoading;

  useEffect(() => {
    if (user.data && !userInfo) {
      setUserInfo(user.data);
    }
  }, [user.data]);

  return (
    <>
      {dataLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 80 }}>
            {banners?.data?.length > 0 && <Carousel data={banners?.data} />}

            {categories?.data?.length > 0 && (
              <>
                <Text style={styles.header}>Shop By Category</Text>
                <Categories data={categories?.data} />
              </>
            )}
            <Text style={styles.header}>Top picks in your neighbourhood</Text>
            <Restaurants />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
});

export default Page;
