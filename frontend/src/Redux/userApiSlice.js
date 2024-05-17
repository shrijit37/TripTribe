import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/auth',
        method: 'POST',
        body: { email, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: () => 'users/profile',
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: 'users/profile',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;


 