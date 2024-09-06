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
    img: string;
  };
};

const AllBikesPageCard = ({ product }: CardProps) => {
  const { _id, name, pricePerHour, isAvailable, model, brand, img } = product;

  const stockStatus = isAvailable ? "In Stock" : "Out of Stock";

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-2 mx-auto md:p-10 md:m-4 w-80 lg:w-auto text-center shadow-lg font-[Roboto]">
      <img src={img} alt={brand} className="w-full h-48 object-cover" />
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{model}</p>
        <p className="text-gray-800 mb-2">Brand: {brand}</p>
        <p className="text-gray-800 mb-2">{stockStatus}</p>

        <p className="text-gray-900 font-bold mb-4">৳{pricePerHour}</p>
        <Link to={`/bikes/${_id}`}>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllBikesPageCard;
