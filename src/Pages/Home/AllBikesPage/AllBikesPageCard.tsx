import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useState } from "react";
import BookingModal from "../../Dashboard/User/BookingModal";
import ReactStars from "react-stars";

type CardProps = {
  product: {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    cc: number;
    year: number;
    model: string;
    brand: string;
    img: string;
    rating?: number;
  };
};

const AllBikesPageCard = ({ product }: CardProps) => {
  const { _id, name, pricePerHour, isAvailable, model, brand, img, rating } = product;

  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector(selectCurrentUser) as any;

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
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-secondary text-secondary-content shadow-lg">
        <img
          src={img}
          alt={brand}
          className="lg:h-48 md:h-36 w-full object-cover object-center"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium  mb-1">
            {model}
          </h2>
          <h1 className="title-font text-lg font-medium  mb-1">{name}</h1>
          <h1 className="title-font text-lg font-medium  mb-0">
            ৳{pricePerHour}
          </h1>
          {/* Displaying the bike's rating */}
          <ReactStars
            count={5}
            value={rating}
            size={24}
            edit={false}
            color2={"#ffd700"}
          />
          <div className="flex flex-col md:flex-row justify-start gap-5 lg:gap-0 md:space-x-2 mt-2">
            <Link to={`/home/bikes/${_id}`}>
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
    ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
  `}
                onClick={
                  isAvailable ? handleBookNowClick : handleNotAvailable
                }
                disabled={!isAvailable}
              >
                {isAvailable ? "Book Now" : "Stock Out"}
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
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirmBooking={handleConfirmBooking}
        id={_id}
      />
    </>
  );
};

export default AllBikesPageCard;
