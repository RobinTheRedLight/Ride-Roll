import { Link } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import { motion } from "framer-motion";
import { fadeLeft } from "../../../Animation/constant";
import { Bike } from "../../../types";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import BookingModal from "../../Dashboard/User/BookingModal";
import { useState } from "react";
import ReactStars from "react-stars";

const Featured = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector(selectCurrentUser) as any;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  } else if (!data || data.data.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-0 md:px-8">
          <h2 className="text-4xl lg:text-5xl  mb-8 text-center font-[Oswald]">
            No Bikes Available
          </h2>
        </div>
      </div>
    );
  }
  const bikes = data.data.slice(0, 8);

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
    <div className="">
      <div className="max-w-7xl mx-auto px-0 md:px-8">
        <div className="text-2xl font-[Oswald] mb-2 text-start mx-4">
          <h1 className="uppercase px-2  inline-block">
            <span className="bg-accent text-neutral-content px-4 py-1 inline-block -skew-x-12">
              Available Bikes
            </span>
          </h1>
          <div className="border-b-2 border-accent mt-2 w-full "></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 font-[Roboto]">
          {bikes.map((bike: Bike) => (
            <>
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileTap={{ scale: 0.95 }}
                key={bike._id}
                className="p-2"
              >
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-secondary text-secondary-content shadow-lg">
                  <img
                    src={bike.img}
                    alt={bike.brand}
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium  mb-1">
                      {bike.model}
                    </h2>
                    <h1 className="title-font text-lg font-medium  mb-1">
                      {bike.name}
                    </h1>
                    <h1 className="title-font text-lg font-medium  mb-0">
                      ৳{bike.pricePerHour}
                    </h1>
                    {/* Displaying the bike's rating */}
                    <ReactStars
                      count={5}
                      value={bike.rating}
                      size={24}
                      edit={false}
                      color2={"#ffd700"}
                    />
                    <div className="flex flex-col md:flex-row justify-start gap-5 lg:gap-0 md:space-x-2 mt-2">
                      <Link to={`/home/bikes/${bike._id}`}>
                        <button
                          className="border border-primary text-primary font-semibold py-1 px-2 rounded-md hover:bg-orange-100 focus:outline-none transition duration-200
                    max-md:w-full 
                        "
                        >
                          View Details
                        </button>
                      </Link>

                      {user && user.role === "user" ? (
                        <button
                          className={` bg-primary hover:bg-orange-600 text-primary-content font-semibold py-1 px-2 rounded-md focus:outline-none transition duration-200
              ${!bike.isAvailable ? "opacity-50 cursor-not-allowed" : ""}
            `}
                          onClick={
                            bike.isAvailable
                              ? handleBookNowClick
                              : handleNotAvailable
                          }
                          disabled={!bike.isAvailable}
                        >
                          {bike.isAvailable ? "Book Now" : "Stock Out"}
                        </button>
                      ) : (
                        <button
                          className="bg-primary hover:bg-orange-600 text-primary-content font-semibold py-1 px-2 rounded-md focus:outline-none transition duration-200"
                          onClick={handleUserNotAvailable}
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              <BookingModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirmBooking={handleConfirmBooking}
                id={bike._id}
              />
            </>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/home/bikes">
            <button className="bg-primary text-primary-content px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-600 focus:outline-none">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
