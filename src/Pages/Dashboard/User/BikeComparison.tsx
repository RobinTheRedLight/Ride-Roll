import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import { RootState } from "../../../redux/store";
import { Bike } from "../../../types";
import {
  addBikeToCompare,
  clearComparison,
  removeBikeFromCompare,
} from "../../../redux/features/bike/bikeCompareSlice";

export const BikeComparison: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBikesQuery(undefined);
  const selectedBikes = useSelector(
    (state: RootState) => state.bikeCompare.selectedBikes
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }

  const bikes: Bike[] = data?.data || [];

  const handleCompareClick = (bike: Bike) => {
    if (selectedBikes.some((b) => b._id === bike._id)) {
      dispatch(removeBikeFromCompare(bike._id));
    } else {
      dispatch(addBikeToCompare(bike));
    }
  };

  
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearchQuery =
      bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.model.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = brandFilter ? bike.brand === brandFilter : true;
    const matchesAvailability = availabilityFilter ? bike.isAvailable : true;
    const matchesPriceRange =
      bike.pricePerHour >= priceRange.min &&
      bike.pricePerHour <= priceRange.max;

    return (
      matchesSearchQuery &&
      matchesBrand &&
      matchesAvailability &&
      matchesPriceRange
    );
  });

  return (
    <div className="p-4 font-[Roboto]">
      {/* Sticky Comparison Table */}
      {selectedBikes.length > 0 && (
        <div className="sticky top-0 z-10 backdrop-blur-lg backdrop-brightness-150 p-4 shadow-md mb-6 border rounded-md  text-secondary-content">
          <h2 className="text-2xl font-[Oswald] mb-4">Compare Bikes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="text-sm">
                  <th className="border px-2 py-1">Feature</th>
                  {selectedBikes.map((bike) => (
                    <th key={bike._id} className="border px-2 py-1">
                      {bike.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border px-2 py-1">Price Per Hour</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike._id} className="border px-2 py-1">
                      ৳{bike.pricePerHour}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">Model</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike._id} className="border px-2 py-1">
                      {bike.model}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">Brand</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike._id} className="border px-2 py-1">
                      {bike.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">CC</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike._id} className="border px-2 py-1">
                      {bike.cc}cc
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">Year</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike._id} className="border px-2 py-1">
                      {bike.year}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 btn btn-primary btn-sm"
            onClick={() => dispatch(clearComparison())}
          >
            Clear Comparison
          </button>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className=" mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, brand, or model"
          className="bg-info border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="bg-info border p-2 rounded w-full md:w-1/5"
        >
          <option value="">All Brands</option>
          {Array.from(new Set(bikes.map((bike) => bike.brand))).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            checked={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.checked)}
            id="availableOnly"
          />
          <label htmlFor="availableOnly">Available Only</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            placeholder="Min Price"
            className="border p-2 rounded w-24 bg-info"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            placeholder="Max Price"
            className="border p-2 rounded w-24 bg-info"
          />
        </div>
      </div>

      {/* Bike List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-secondary text-secondary-content p-4 border rounded-lg shadow-md"
            >
              <img
                src={bike.img}
                alt={bike.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="font-bold text-lg mb-2">{bike.name}</h3>
              <p className=" mb-2">Model: {bike.model}</p>
              <p className=" mb-2">
                Price Per Hour:{" "}
                <span className="text-sm font-extrabold">৳</span>
                {bike.pricePerHour}
              </p>
              <p
                className={`mb-2 ${
                  bike.isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {bike.isAvailable ? "Available" : "Unavailable"}
              </p>
              <button
                className={`mt-2 ${
                  selectedBikes.some((b) => b._id === bike._id)
                    ? "btn bg-red-600 text-white"
                    : "btn btn-success"
                }`}
                onClick={() => handleCompareClick(bike)}
              >
                {selectedBikes.some((b) => b._id === bike._id)
                  ? "Remove"
                  : "Compare"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            No bikes found matching the criteria.
          </p>
        )}
      </div>
    </div>
  );
};
