import { PhotoProvider, PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import BookingModal from "../../Dashboard/User/BookingModal";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { Bike } from "../../../types";

const DetailsOfBike = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useGetBikesQuery(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector(selectCurrentUser) as any;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-8 text-lg">No data available</div>;
  }

  const bikes = data?.data || [];
  const bike = bikes.find((bike: Bike) => bike._id === id);

  if (!bike) {
    return <div className="text-center mt-8 text-lg">Bike not found</div>;
  }

  const handleBookNowClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleConfirmBooking = () => {
    setModalOpen(false);
  };

  const handleNotAvailable = () =>
    alert("Bike is not available at the moment.");
  const handleUserNotAvailable = () =>
    alert("Please log in as an user to book the bike.");

  return (
    <>
      <div className="container mx-auto mt-6 mb-12">
        <h1 className="text-5xl text-center font-[Oswald] text-secondary-content">
          {bike.name}
        </h1>
        <div className="card lg:card-side shadow-xl font-[Roboto] bg-secondary text-secondary-content mt-6">
          <figure className="w-full lg:w-1/2">
            <PhotoProvider>
              <PhotoView src={bike.img}>
                <img
                  src={bike.img}
                  alt={bike.name}
                  className="object-contain w-full h-96"
                />
              </PhotoView>
            </PhotoProvider>
          </figure>

          <div className="card-body lg:w-1/2 ">
            <ul className="space-y-2 ">
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
                  <span className="text-red-500">Out of Stock</span>
                )}
              </li>
              <li className="text-lg">
                <strong>CC:</strong> {bike.cc}
              </li>
              <li className="text-lg">
                <strong>Year:</strong> {bike.year}
              </li>
              <li className="text-lg">
                <strong>Model:</strong> {bike.model}
              </li>
              <li className="text-lg">
                <strong>Brand:</strong> {bike.brand}
              </li>
            </ul>

            <div className="mt-2">
              {user && user.role === "user" ? (
                <button
                  className={`w-full lg:w-auto px-6 py-2 bg-black text-white rounded-md text-lg hover:bg-slate-700 transition-colors ${
                    !bike.isAvailable ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={
                    bike.isAvailable ? handleBookNowClick : handleNotAvailable
                  }
                  disabled={!bike.isAvailable}
                >
                  {bike.isAvailable ? "Book Now" : "Out of Stock"}
                </button>
              ) : (
                <button
                  className="w-full lg:w-auto px-6 py-3 bg-black text-white rounded-md text-lg hover:bg-slate-700 transition-colors"
                  onClick={handleUserNotAvailable}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirmBooking={handleConfirmBooking}
        id={id}
      />
    </>
  );
};

export default DetailsOfBike;
