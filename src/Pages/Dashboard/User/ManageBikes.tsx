import { useState } from "react";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import Card from "./Card";

type Product = {
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

const ManageBikes = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    availability: null,
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg h-full mx-auto"></span>;
  }
  const bikes = data.data;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilter({
      brand: "",
      model: "",
      availability: null,
    });
  };

  const filteredProducts = bikes.filter((product: Product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.brand ? product.brand === filter.brand : true) &&
      (filter.model ? product.model === filter.model : true) &&
      (filter.availability ? product.isAvailable === filter.availability : true)
    );
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl mb-8 text-center font-[oswald]">
        All Bikes
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 mb-2 md:mb-0 md:mr-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <select
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Brands</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Hero">Hero</option>
            <option value="Yamaha">Yamaha</option>
          </select>
          <select
            name="model"
            value={filter.model}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Sport">Sport</option>
            <option value="Touring">Touring</option>
            <option value="Off-road">Off-road</option>
          </select>
          <button
            onClick={handleClearFilters}
            className="p-2 border border-gray-300 rounded bg-red-500 text-white w-full md:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center ">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-xl">No products found.</p>
        ) : (
          filteredProducts.map((product: Product) => (
            <Card key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBikes;
