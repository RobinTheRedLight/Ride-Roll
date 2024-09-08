import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import BookingModal from "./BookingModal";
import { Bike } from "../../../types";

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }

  const bikes = data?.data || [];
  const bike = bikes.find((bike: Bike) => bike._id === id);

  if (!bike) {
    return <div className="text-center text-xl mt-8">Bike not found.</div>;
  }

  const handleBookNowClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleConfirmBooking = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-5xl mb-4 font-[Oswald] text-center ">{bike.name}</h1>
      <div className="card lg:card-side bg-base-100 shadow-xl font-[Roboto]">
        <figure className="w-full lg:w-1/2">
          <img
            src={bike.img}
            alt={bike.name}
            className="object-contain w-full h-96"
          />
        </figure>

        <div className="card-body lg:w-1/2">
          <ul className="space-y-2">
            <li className="text-lg">
              <strong>Description:</strong> {bike.description}
            </li>
            <li className="text-lg">
              <strong>Price per Hour:</strong> ৳{bike.pricePerHour}
            </li>
            <li className="text-lg">
              <strong>Availability:</strong>{" "}
              {bike.isAvailable ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-red-500">Not Available</span>
              )}
            </li>
            <li className="text-lg">
              <strong>CC:</strong> {bike.cc}
            </li>
            <li className="text-lg">
              <strong>Year:</strong> {bike.year}
            </li>
            <li className="text-lg">
              <strong>Model Type:</strong> {bike.model}
            </li>
            <li className="text-lg">
              <strong>Brand:</strong> {bike.brand}
            </li>
          </ul>

          <button
            className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-slate-700"
            onClick={handleBookNowClick}
            disabled={!bike.isAvailable}
          >
            {bike.isAvailable ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirmBooking={handleConfirmBooking}
        id={id}
      />
    </div>
  );
};

export default BikeDetails;
