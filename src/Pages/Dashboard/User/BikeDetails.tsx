import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import BookingModal from "./BookingModal";

type Bike = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
};

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const bikes = data.data;
  const bike = bikes.find((element: Bike) => element._id === id);

  const handleBookNowClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirmBooking = (startTime: string) => {
    // Implement payment logic here
    // Redirect to payment page or handle payment with Tk 100
    // After successful payment, close modal and update bike availability
    alert(`Booking confirmed! Start time: ${startTime}`);
    setModalOpen(false);

    // You can update bike availability status here as well if needed
  };

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl mt-12 font-[Roboto]">
        <div className="card-body">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{bike.name}</h1>
            {/* Bike details */}
            <p className="text-lg mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {bike.description}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Price per Hour:</span> ৳
              {bike.pricePerHour}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Availability:</span>{" "}
              {bike.isAvailable ? "Available" : "Not Available"}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">CC:</span> {bike.cc}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Year:</span> {bike.year}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Model:</span> {bike.model}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Brand:</span> {bike.brand}
            </p>
          </div>
        </div>
        <figure>
          <div className="flex items-center justify-center p-10">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700"
              onClick={handleBookNowClick}
            >
              Book Now
            </button>
          </div>
        </figure>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirmBooking={handleConfirmBooking}
        id={id}
      />
    </>
  );
};

export default BikeDetails;
