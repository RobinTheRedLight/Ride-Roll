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
    getRentals: builder.query({
      query: () => ({
        url: "/rentals",
        method: "GET",
      }),
      providesTags: ["rentals"],
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
  useGetRentalsQuery,
} = userApi;
