import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "users/allUsers",
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),

    addBike: builder.mutation({
      query: (formData) => {
        return {
          url: "/bikes",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["bikes"],
    }),

    updateBike: builder.mutation({
      query: (bikeInfo) => {
        return {
          url: `/bikes/${bikeInfo.id}`,
          method: "PUT",
          body: bikeInfo.data,
        };
      },
      invalidatesTags: ["bikes"],
    }),

    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bikes"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUsers"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useDeleteUserMutation,
} = adminApi;
