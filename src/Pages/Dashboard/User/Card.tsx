import { Link } from "react-router-dom";

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
  };
};

const Card = ({ product }: CardProps) => {
  const { _id, name, description, pricePerHour, isAvailable, model, brand } =
    product;

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 w-72 text-center shadow-lg font-[Roboto]">
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{model}</p>
        <p className="text-gray-800 mb-2">In Stock: {isAvailable}</p>
        <p className="text-gray-800 mb-2">Brand: {brand}</p>
        <p className="text-gray-600 mb-2 truncate">{description}</p>
        <p className="text-gray-900 font-bold mb-4">${pricePerHour}</p>
        <Link to={`/dashboard/bikes/${_id}`}>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
