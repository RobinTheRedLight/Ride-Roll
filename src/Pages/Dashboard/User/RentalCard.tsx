import { Link } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import moment from "moment";

type Rental = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: string;
  returnTime: Date | null;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
};

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

const RentalCard = ({ rental }: { rental: Rental }) => {
  const { _id, startTime, returnTime, totalCost, isPaid, bikeId } = rental;
  const { data, isLoading } = useGetBikesQuery(undefined);

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }

  const formattedStartTime =
    startTime !== null
      ? moment(startTime).format("MMMM Do YYYY, h:mm a")
      : "N/A";

  const formattedReturnTime =
    returnTime !== null
      ? moment(returnTime).format("MMMM Do YYYY, h:mm a")
      : "N/A";

  const bikes = data.data;
  const bike = bikes.find((element: Bike) => element._id === bikeId);

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-[22rem] lg:w-96 text-center shadow-lg font-[Roboto] mt-5">
      <div className="mt-4 ">
        <h3 className="text-xl font-bold mb-2">{bike.name}</h3>
        <div className="text-start p-0 lg:p-5">
          <p className="text-gray-800 mb-2">
            {" "}
            <span className="font-semibold ">Start Time: </span>{" "}
            {formattedStartTime}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Return Time: </span>
            {formattedReturnTime}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Total Cost: </span>
            {totalCost}
          </p>
        </div>
        {!isPaid ? (
          <Link to={`/dashboard/pay/${_id}`} state={{ totalCost }}>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Pay ৳ {totalCost}
            </button>
          </Link>
        ) : (
          <button className="bg-green-700 px-4 py-2 rounded text-white">Paid</button>
        )}
      </div>
    </div>
  );
};

export default RentalCard;