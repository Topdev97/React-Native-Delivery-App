import { useQuery } from "@tanstack/react-query";
import * as API from "@/core/services/home/home.api";
import { queries } from "@/core/constants/queryKeys";

export const getBanners = (options: any) =>
  useQuery({
    queryKey: queries.home.banners.queryKey,
    queryFn: API.getBanners,
    ...options,
  });

export const getCategories = (options: any) =>
  useQuery({
    queryKey: queries.home.mainCategories.queryKey,
    queryFn: API.getCategories,
    ...options,
  });

export const getCatMenus = (options: any, id: any) =>
  useQuery({
    queryKey: queries.home.catMenus.queryKey,
    queryFn: () => API.getCatMenus(id),
    ...options,
  });

export const getAllMenus = (options: any) =>
  useQuery({
    queryKey: queries.home.allMenus.queryKey,
    queryFn: API.getAllMenus,
    ...options,
  });

export const getUserInfo = (options: any) =>
  useQuery({
    queryKey: queries.home.userAddress.queryKey,
    queryFn: API.getAddress,
    ...options,
  });

export const test = (options: any) =>
  useQuery({
    queryKey: queries.home.home_info.queryKey,
    queryFn: API.test,
    ...options,
  });
