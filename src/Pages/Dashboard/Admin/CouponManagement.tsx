import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useAddCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "../../../redux/features/admin/adminApi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

interface CouponFormData {
  _id?: string;
  code: string;
  discount: number;
  expiryDate: string;
  description: string;
}

const CouponManagement = () => {
  const { data: couponsData, isLoading } = useGetAllCouponsQuery(undefined);
  const [addCoupon, { data: responseCoupon }] = useAddCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormData>();

  const onSubmit = async (data: CouponFormData) => {
    try {
      await addCoupon(data);
      reset();
    } catch (error) {
      console.error("Failed to create coupon:", error);
    }
  };

  useEffect(() => {
    if (responseCoupon) {
      console.log("Coupon created:", responseCoupon);
    }
  }, [responseCoupon]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
      </div>
    );
  }

  const handleDelete = async (_id: string | undefined) => {
    const id = _id;
    try {
      await deleteCoupon(id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Coupon Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  return (
    <div className="max-w-4xl md:w-full mx-auto mt-0 lg:mt-5 p-4 sm:p-8  shadow-lg rounded-lg font-[Roboto]">
      <Helmet>
        <title>Dashboard | Coupon Management</title>
      </Helmet>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center t mb-6 font-[Oswald]">
        Coupon Management
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 mt-0 lg:mt-10"
      >
        <div>
          <label className="block text-sm font-medium ">
            Coupon Code
          </label>
          <input
            type="text"
            {...register("code", { required: "Coupon code is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter coupon code"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">
            Discount (%)
          </label>
          <input
            type="number"
            {...register("discount", {
              required: "Discount is required",
              min: { value: 0, message: "Minimum discount is 0%" },
              max: { value: 100, message: "Maximum discount is 100%" },
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter discount"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Expiry Date
          </label>
          <input
            type="date"
            {...register("expiryDate", {
              required: "Expiry date is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium ">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter coupon description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
          <button
            type="submit"
            className="mt-4 w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Coupon
          </button>
        </div>
      </form>

      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className=" backdrop-brightness-150">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Code
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Discount
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {couponsData.data && couponsData.data.length > 0 ? (
            couponsData.data.map((coupon: CouponFormData) => (
              <tr key={coupon.code} className="">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium ">
                  {coupon.code}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm ">
                  {coupon.discount}%
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm ">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="ml-4 text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 sm:px-6 py-4 text-center text-sm"
              >
                No coupons available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponManagement;
