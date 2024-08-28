import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "users/allUsers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = adminApi;
