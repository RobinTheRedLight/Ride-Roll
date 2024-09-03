import { useLocation, useParams } from "react-router-dom";
import { useGetRentalsQuery } from "../../../redux/features/user/userApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FullPayForm from "./FullPayForm/FullPayForm";
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

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const bookings = data.data;
  const booking: booking = bookings.find(
    (element: booking) => element._id === id
  );
  console.log(booking);

  let toPay;

  if (booking.totalCost !== 0) {
    toPay = booking.totalCost - 100;
  } else {
    toPay = 0;
  }

  const bookingData = {
    id: id as string,
    price: state.totalCost as number,
  };
  return (
    <div className="font-[Roboto] mt-10 p-5">
      <h1 className="text-3xl md:text-5xl font-[Oswald]">
        Confirm your payment
      </h1>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Advanced Payed:</span> ৳100
      </p>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Payment:</span> ৳{booking.totalCost}
      </p>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Total Cost:</span> ৳{toPay}
      </p>
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