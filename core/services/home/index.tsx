import { useQuery } from "@tanstack/react-query";
import * as API from "@/core/services/home/home.api";
import { queries } from "@/core/constants/queryKeys";

export const homeDataUser = (options: any) =>
  useQuery({
    queryKey: queries.home.home_info.queryKey,
    queryFn: API.getEmployees,
    ...options,
  });
