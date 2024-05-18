import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


const BASE_URL = "http://localhost:8080/api"
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["user"],
  endpoints: () => ({}),
});