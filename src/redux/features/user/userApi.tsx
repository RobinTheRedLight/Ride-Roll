import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getBikes: builder.query({
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
      providesTags: ["bikes"],
    }),
    updateProfile: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users/me",
          method: "PUT",
          body: userInfo,
        };
      },
      invalidatesTags: ["profile"],
    }),
    addRental: builder.mutation({
      query: (rentalData) => {
        console.log(rentalData);
        return {
          url: "/rentals",
          method: "POST",
          body: rentalData,
        };
      },
      invalidatesTags: ["bikes"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBikesQuery,
  useAddRentalMutation,
} = userApi;
