import moment from "moment";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";

type RentalProps = {
  rental: {
    _id: string;
    userId: string;
    bikeId: string;
    startTime: string;
    returnTime: string;
    totalCost: number;
    isReturned: boolean;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  onUpdate: () => void;
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

const ReturnBikeCard = ({ rental, onUpdate }: RentalProps) => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }

  const { bikeId, startTime, returnTime, totalCost, isReturned, isPaid } =
    rental;

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
  console.log(bikes);

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 w-72 text-center shadow-lg font-[Roboto]">
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{bike?.name}</h3>
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
          <p className="text-gray-800 mb-2">
            In Stock: {isReturned ? "Yes" : "No"}
          </p>
          <p className="text-gray-800 mb-2">Paid: {isPaid ? "Yes" : "No"}</p>
        </div>
        <button
          onClick={onUpdate}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default ReturnBikeCard;
