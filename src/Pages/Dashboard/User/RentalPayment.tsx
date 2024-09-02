import { useLocation, useParams } from "react-router-dom";
import { useGetRentalsQuery } from "../../../redux/features/user/userApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FullPayForm from "./FullPayForm/FullPayForm";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCouponCode,
  selectCouponCode,
} from "../../../redux/features/user/userSlice";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

type booking = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
};

const RentalPayment = () => {
  const { data, isLoading } = useGetRentalsQuery(undefined);
  const { state } = useLocation();
  const { id } = useParams();

  const couponCode = useSelector(selectCouponCode);
  const [coupon, setCoupon] = useState(couponCode || "");
  const [totalCost, setTotalCost] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isLoading) {
      const bookings = data.data;
      const booking: booking = bookings.find(
        (element: booking) => element._id === id
      );

      if (booking) {
        const cost = booking.totalCost;

        setTotalCost(cost - 100);
      }
    }

    if (couponCode) {
      dispatch(clearCouponCode());
    }
  }, [data, isLoading, id, coupon, couponCode, dispatch]);

  const handleApplyCoupon = () => {
    let cost = state.totalCost;

    if (coupon === "SUMMER2024") cost *= 0.8;
    if (coupon === "PAYTK300" && cost > 300) cost -= 20;
    if (coupon === "HOLIDAY50" && cost > 500) cost -= 50;

    setTotalCost(Math.floor(cost - 100));
  };

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const bookingData = {
    id: id as string,
    price: totalCost,
  };

  return (
    <div className="font-[Roboto] mt-10 p-5 max-w-2xl">
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
        <Elements stripe={stripePromise}>
          <FullPayForm bookingData={bookingData}></FullPayForm>
        </Elements>
      </div>
    </div>
  );
};

export default RentalPayment;
