import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    // REGISTER
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // GET DETAIL PROFILE
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),

    // UPDATE PROFILE
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // GET ALL USERS
    getAllUsers: builder.query({
      query: (accessToken) => ({
        url: `${USERS_URL}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // NEW ACCESS TOKEN
    newAccessToken: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}/refresh-token`,
        method: "GET",
      }),
    }),

    // GET USER BY ID
    getUserById: builder.query({
      query: ({ accessToken }) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }),
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useNewAccessTokenMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
