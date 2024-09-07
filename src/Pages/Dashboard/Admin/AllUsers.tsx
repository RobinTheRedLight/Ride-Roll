import { Helmet } from "react-helmet-async";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserAdminMutation,
} from "../../../redux/features/admin/adminApi";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { User } from "../../../types";



const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserAdmin] = useUpdateUserAdminMutation();
  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }
  const users = data.data;

  const handleMakeAdmin = async (user: User) => {
    try {
      const adminData = {
        id: user._id,
        data: { role: "admin" },
      };
      await updateUserAdmin(adminData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User role updated to admin",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user._id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4 mt-5">
      <Helmet>
        <title>Dashboard | All Users</title>
      </Helmet>
      <h3 className="text-3xl font-['Oswald'] mb-5">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: number) => (
              <tr key={user._id} className="border-b">
                <th className="p-2">{index + 1}</th>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 font-bold text-orange-600">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn text-white bg-orange-600 hover:bg-orange-500"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn text-white bg-red-700 hover:bg-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
