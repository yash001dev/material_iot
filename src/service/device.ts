import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getDeviceListByType: builder.query({
      query: (type) => ({
        url: `${type}.json`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDeviceListByTypeQuery } = deviceApi;
