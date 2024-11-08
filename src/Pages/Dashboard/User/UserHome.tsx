/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetBikesQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/user/userApi";
import UserHomeModal from "./UserHomeModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetAllRentalsQuery } from "../../../redux/features/admin/adminApi";

const UserHome = () => {
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch,
  } = useGetProfileQuery(undefined);
  const { data: bikesData, isLoading: bikesLoading } =
    useGetBikesQuery(undefined);
  const { data: rentalsData, isLoading: rentalsLoading } =
    useGetAllRentalsQuery(undefined);

  const [updateProfile] = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState<any>(null);
  const user = useAppSelector(selectCurrentUser) as any;

  if (profileLoading || bikesLoading || rentalsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg h-screen"></span>
      </div>
    );
  }

  const bikes = bikesData?.data;
  const rentals = rentalsData?.data;

  const handleEditProfile = (user: any) => {
    setEditProfileData(user);
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (formData: any) => {
    if (editProfileData) {
      await updateProfile({ id: editProfileData._id, ...formData });
      setIsModalOpen(false);
      setEditProfileData(null);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update profile. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const brandData = bikes?.reduce((acc: any, bike: any) => {
    const brand = bike.brand;
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  const brandChartData = Object.keys(brandData || {}).map((brand) => ({
    brand,
    count: brandData[brand],
  }));

  const paidBookingsCount =
    rentals?.filter((rental: any) => rental.isPaid).length || 0;
  const totalRevenue = rentals?.reduce((acc: number, rental: any) => {
    return rental.isPaid ? acc + rental.totalCost : acc;
  }, 0);

  const paymentStatusData = rentals
    ? [
        {
          name: "Paid",
          value: rentals.filter((rental: any) => rental.isPaid).length,
        },
        {
          name: "Unpaid",
          value: rentals.filter((rental: any) => !rental.isPaid).length,
        },
      ]
    : [];

  return (
    <div className="font-[Roboto] mx-auto max-w-5xl py-4 lg:p-4 w-full">
      <Helmet>
        <title>Dashboard | {profileData?.data?.name}</title>
      </Helmet>

      {user.role === "admin" ? (
        <div>
          <header className="bg-secondary text-secondary-content text-center p-5 rounded-lg shadow-lg">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Welcome, {profileData?.data?.name}!
            </h1>
          </header>
          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary text-secondary-content p-6 rounded-lg shadow-lg max-w-xl  ">
              <h2 className="text-2xl font-semibold text-center mb-4">
                User Profile
              </h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 ">
                <div>
                  <p>
                    <strong>Name:</strong> {profileData?.data?.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {profileData?.data?.address}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Phone:</strong> {profileData?.data?.phone}
                  </p>

                  <p>
                    <strong>Email:</strong> {profileData?.data?.email}
                  </p>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => handleEditProfile(profileData?.data)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {user.role === "admin" && (
              <div className="bg-secondary text-secondary-content p-5 rounded-lg shadow-lg text-center max-w-xl">
                <h3 className="text-2xl font-semibold mb-4">Total Revenue</h3>
                <p className="stat-value text-green-500">${totalRevenue}</p>
                <p className="text-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  {paidBookingsCount} bookings paid
                </p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div>
          <div className="text-center ">
            <div className="stats shadow bg-secondary text-secondary-content">
              <div className="stat w-[330px] md:w-[700px]">
                <div className="text-4xl lg:text-5xl font-[Oswald]">
                  Welcome
                </div>
                <div className="text-2xl ">{user.name}</div>
              </div>
            </div>
          </div>
          <div className=" shadow-lg rounded-lg p-6 max-w-md lg:max-w-full mx-auto my-4 border bg-secondary text-secondary-content">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              User Details
            </h2>
            <div className="text-center">
              <div className="mb-2">
                <span className="font-semibold">Name: </span>
                {user.name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Email: </span>
                {user.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Phone: </span>
                {user.phone}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Address: </span>
                {user.address}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleEditProfile(user)}
              className=" btn btn-primary  btn-sm md:btn-md"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      <UserHomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateProfile}
        initialData={editProfileData}
      />

      {user.role === "admin" && (
        <section className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-secondary text-secondary-content pt-6 lg:p-6 rounded-lg shadow-lg text-center max-w-xl ">
              <h3 className="text-xl font-semibold mb-4">Bikes by Brand</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={brandChartData}
                  margin={{
                    top: 0,
                    right: 40,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="brand" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="max-w-xl bg-secondary text-secondary-content p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4"> Payment Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {paymentStatusData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#4CAF50" : "#FF6347"}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserHome;
