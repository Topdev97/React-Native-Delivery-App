import { QueryClientConfig } from '@tanstack/react-query'
import {BASE_URL,RAZOR_PAY_ID,EXPO_PUBLIC_GOOGLE_API_KEY} from "@env"


export const ENV = {
  BASE_URL,
  RAZOR_PAY_ID,EXPO_PUBLIC_GOOGLE_API_KEY
}

export const API_CONFIG = {
  timeout: 5 * 60 * 1000, // 5 Minutes
  baseURL: BASE_URL,
}

export const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      ...(BASE_URL === 'local'
        ? {
            refetchOnWindowFocus: false,
            staleTime: 1 * 60 * 1000, // 1 Minute
          }
        : {
            refetchOnWindowFocus: true,
            staleTime: 0, // 0 Minute
          }),

      retry: (_, error: any) => {
        const statusCode = error?.response?.status
        const excludeStatus = [401, 404, 403, 500]

        return !excludeStatus.includes(statusCode)
      },
    },
  },
}

export const MASTERS_STALE_TIME: number = 1 * 60 * 60 * 60 // 1 hour

export const SENTRY_APP_NAME = 'Manufacture'
