import { useState } from "react";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import AllBikesCard from "./AllBikesCard";
import BikeFormModal from "./BikeFormModal";
import { useDeleteBikeMutation } from "../../../redux/features/admin/adminApi";
import { Helmet } from "react-helmet-async";
import { Bike } from "../../../types";
import Swal from "sweetalert2";

const AllBikes = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteBike] = useDeleteBikeMutation();
  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    availability: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
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

  const handleCreateBike = () => {
    setSelectedBike(null);
    setShowModal(true);
  };

  const handleEditBike = (bike: Bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const handleDeleteBike = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      try {
        await deleteBike(id).unwrap();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bike deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Failed to delete bike:", error);
      }
    }
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
        <title>Dashboard | Bike Management</title>
      </Helmet>
      <h2 className="text-secondary-content text-3xl md:text-5xl mb-8 text-center font-[oswald]">
        All Bikes
      </h2>

      <button
        onClick={handleCreateBike}
        className="p-2 mb-4 border border-gray-300 rounded bg-blue-500 text-white"
      >
        Create Bike
      </button>

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
            className="bg-info p-2 border border-gray-300 rounded w-full md:w-auto"
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
            className="bg-info p-2 border border-gray-300 rounded w-full md:w-auto"
          >
            <option value="">All Models</option>
            <option value="Standard">Standard</option>
            <option value="Sport">Sport</option>
            <option value="Touring">Touring</option>
            <option value="Off-road">Off-road</option>
          </select>
          <select
            name="availability"
            value={filter.availability}
            onChange={handleFilterChange}
            className="bg-info p-2 border border-gray-300 rounded w-full md:w-auto"
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
        <div className="grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredProducts.map((product: Bike) => (
            <AllBikesCard
              key={product._id}
              product={product}
              onEdit={() => handleEditBike(product)}
              onDelete={() => handleDeleteBike(product._id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <BikeFormModal
          bikeData={selectedBike}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AllBikes;
