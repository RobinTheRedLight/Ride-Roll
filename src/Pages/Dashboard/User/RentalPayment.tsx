import { useLocation, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FullPayForm from "./FullPayForm/FullPayForm";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCouponCode,
  selectCouponCode,
} from "../../../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import {
  useGetAllCouponsQuery,
  useGetAllRentalsQuery,
  useUpdateBikeMutation,
} from "../../../redux/features/admin/adminApi";
import { Coupon, Rental } from "../../../types";
import ReactStars from "react-stars";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const RentalPayment = () => {
  const { data, isLoading } = useGetAllCouponsQuery(undefined);
  const { data: rentals, isLoading: isRentalLoading } =
    useGetAllRentalsQuery(undefined);
  const { state } = useLocation();
  const { id } = useParams();
  const couponCode = useSelector(selectCouponCode);
  const [coupon, setCoupon] = useState(couponCode || "");
  const [totalCost, setTotalCost] = useState<number>(0);
  const dispatch = useDispatch();
  const [updateBike] = useUpdateBikeMutation();
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    const cost = state.totalCost;
    setTotalCost(cost - 100);
  }, [state, id]);

  if (isLoading || isRentalLoading) {
    return (
      <span className="loading loading-infinity loading-lg h-full mx-auto"></span>
    );
  }

  const rentalsData = rentals?.data || [];
  const rentalData = rentalsData.find((rental: Rental) => rental._id === id);

  const coupons = data.data;

  const handleApplyCoupon = () => {
    let cost = totalCost;
    if (couponCode) {
      if (coupon === "FREE10") cost *= 0.9;
      else if (coupon === "FREE20") cost *= 0.8;
      else if (coupon === "FREE30") cost *= 0.7;
      else {
        coupons.forEach((coupon: Coupon) => {
          if (coupon.code === couponCode) {
            cost = cost - cost * (coupon.discount / 100);
          }
        });
      }
      setTotalCost(Math.floor(cost));
      dispatch(clearCouponCode());
    }
  };

  // Handler for setting user rating
  const handleRatingChange = async (newRating: number) => {
    setUserRating(newRating);

    try {
      await updateBike({ id: rentalData.bikeId, data: { rating: newRating } });
      console.log("Rating updated successfully:", newRating);
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };

  const bookingData = {
    id: id as string,
    price: totalCost as number,
  };

  return (
    <div className="font-[Roboto] mt-10 p-5 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-[Oswald]">
        Confirm your payment
      </h1>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Advanced Payed:</span> ৳100
      </p>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Payment:</span> ৳{state.totalCost}
      </p>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Total Cost:</span> ৳{totalCost}
      </p>
      <div className="divider"></div>
      <div>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon Code"
          className="StripeElement"
        />
        <button onClick={handleApplyCoupon} className="btn mt-2">
          Apply Coupon
        </button>
      </div>
      <div className="divider"></div>
      <div>
        <h3 className="font-semibold">Rate your experience:</h3>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={24}
          value={userRating}
          color2={"#ffd700"}
        />
      </div>
      <div className="divider"></div>
      <Elements stripe={stripePromise}>
        <FullPayForm bookingData={bookingData}></FullPayForm>
      </Elements>
    </div>
  );
};

export default RentalPayment;
