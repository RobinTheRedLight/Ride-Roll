/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/user/userApi";
import UserHomeModal from "./UserHomeModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { data, isLoading, refetch } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfiletData, setEditProfileData] = useState<any>(null);

  if (isLoading) {
    return (
      <span className="loading loading-infinity loading-lg h-full mx-auto"></span>
    );
  }
  const user = data.data;

  const handleEditProfile = (user: any) => {
    setEditProfileData(user);
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (formData: any) => {
    if (editProfiletData) {
      await updateProfile({ id: editProfiletData._id, ...formData });
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
      console.error("No profile data available to update.");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update product. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="font-[Roboto] max-w-3xl mx-auto">
      <Helmet>
        <title>Dashboard | {user.name}</title>
      </Helmet>
      <div className="text-center">
        <div className="stats shadow">
          <div className="stat w-[330px] md:w-[700px]">
            <div className="text-4xl lg:text-5xl font-[Oswald]">Welcome</div>
            <div className="text-2xl ">{user.name}</div>
          </div>
        </div>
      </div>

      <div className=" shadow-lg rounded-lg p-6 max-w-md lg:max-w-full mx-auto my-4 border">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <div className="">
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
      <UserHomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateProfile}
        initialData={editProfiletData}
      />
    </div>
  );
};

export default UserHome;
