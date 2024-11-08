import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import AllBikesPageCard from "./AllBikesPageCard";
import { Helmet } from "react-helmet-async";
import { Bike } from "../../../types";

const ManageBikes = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    availability: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);
  }, [location]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg h-screen"></span>
      </div>
    );
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
      availability: "",
    });
  };

  const filteredProducts = bikes.filter((product: Bike) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.brand ? product.brand === filter.brand : true) &&
      (filter.model ? product.model === filter.model : true) &&
      (filter.availability
        ? product.isAvailable.toString() === filter.availability
        : true)
    );
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>Ride & Roll | Bikes</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl mb-8 text-center font-[oswald] text-secondary-content">
        All Bikes
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-info p-2 mb-2 md:mb-0 md:mr-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <select
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
            className="p-2 border bg-info border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Brands</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Kawasaki">Kawasaki</option>
            <option value="Yamaha">Yamaha</option>
          </select>
          <select
            name="model"
            value={filter.model}
            onChange={handleFilterChange}
            className="p-2 border bg-info border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Sport">Sport</option>
            <option value="Touring">Touring</option>
            <option value="Off-road">Off-road</option>
          </select>
          <select
            name="availability"
            value={filter.availability}
            onChange={handleFilterChange}
            className="p-2 border bg-info border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
          <button
            onClick={handleClearFilters}
            className="p-2 border border-gray-300 rounded bg-red-500 text-white w-full md:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5 font-[Roboto]">
          {filteredProducts.map((product: Bike) => (
            <AllBikesPageCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBikes;
