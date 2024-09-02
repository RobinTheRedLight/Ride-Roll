import Swal from "sweetalert2";
import {
  useGetAllRentalsQuery,
  useUpdateRentalMutation,
} from "../../../redux/features/admin/adminApi";
import ReturnBikeCard from "./ReturnBikeCard";

type Rental = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ReturnBike = () => {
  const { data, isLoading } = useGetAllRentalsQuery(undefined);
  const [updateRental] = useUpdateRentalMutation();

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }

  const rentals = data.data;

  const handleUpdateRental = async (_id: string) => {
    await updateRental(_id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Bike returned successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl mb-8 text-center font-[oswald]">
        All Rentals
      </h2>

      {rentals.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {rentals.map((rental: Rental) => (
            <ReturnBikeCard
              key={rental._id}
              rental={rental}
              onUpdate={() => handleUpdateRental(rental._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnBike;