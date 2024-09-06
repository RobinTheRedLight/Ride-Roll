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
  onEdit: () => void;
  onDelete: () => void;
};

const AllBikesCard = ({ product, onEdit, onDelete }: CardProps) => {
  const { name, description, pricePerHour, isAvailable, model, brand, img } =
    product;

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 w-80 text-center shadow-lg font-[Roboto]">
      <img src={img} alt={name} className="w-full h-48 object-cover rounded" />
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{model}</p>
        <p className="text-gray-800 mb-2">
          In Stock: {isAvailable ? "Yes" : "No"}
        </p>
        <p className="text-gray-800 mb-2">Brand: {brand}</p>
        <p className="text-gray-600 mb-2 truncate">{description}</p>
        <p className="text-gray-900 font-bold mb-4">৳{pricePerHour}</p>
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AllBikesCard;
