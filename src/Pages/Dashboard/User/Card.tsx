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

const Card = ({ product }: CardProps) => {
  const {
    _id,
    name,
    description,
    pricePerHour,
    isAvailable,
    model,
    brand,
    img,
  } = product;

  const stockStatus = isAvailable ? "In Stock" : "Out of Stock";

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 w-80 text-center shadow-lg font-[Roboto]">
      <div className="mt-4">
        <img src={img} alt={brand} className="w-full h-48 object-cover" />
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className=" mb-2">{model}</p>
        <p className="mb-2">{stockStatus}</p>
        <p className=" mb-2">Brand: {brand}</p>
        <p className=" mb-2 truncate">{description}</p>
        <p className=" font-bold mb-4"> ৳{pricePerHour}</p>
        <Link to={`/dashboard/bikes/${_id}`}>
          <button className="btn btn-primary">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
