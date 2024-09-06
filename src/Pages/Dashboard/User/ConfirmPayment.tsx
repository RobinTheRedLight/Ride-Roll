import { useLocation, useParams } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

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

const ConfirmPayment = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  const { state } = useLocation();
  const { id } = useParams();
  const price = 100;

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const bikes = data.data;
  const bike: Bike = bikes.find((element: Bike) => element._id === id);

  const bikedData = {
    startTime: state.startTime as Date,
    id: id as string,
    price: price as number,
  };

  return (
    <div className="font-[Roboto] mt-10 p-5 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-[Oswald]">
        Confirm your payment
      </h1>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Bike Name:</span> {bike.name}
      </p>
      <div className="divider"></div>
      <p>
        <span className="font-semibold">Advance Payment:</span> ৳{price}
      </p>
      <div className="divider"></div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm bikedData={bikedData}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default ConfirmPayment;
