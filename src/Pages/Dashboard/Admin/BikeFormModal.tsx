import React, { useEffect, useState } from "react";
import {
  useAddBikeMutation,
  useUpdateBikeMutation,
} from "../../../redux/features/admin/adminApi";

type BikeFormModalProps = {
  bikeData: {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    cc: number;
    year: number;
    model: string;
    brand: string;
    img: string;
  } | null;
  onClose: () => void;
};

const BikeFormModal = ({ bikeData, onClose }: BikeFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerHour: 0,
    cc: 0,
    year: 0,
    model: "",
    brand: "",
    img: "",
  });

  const [addBike] = useAddBikeMutation();
  const [updateBike] = useUpdateBikeMutation();

  useEffect(() => {
    if (bikeData) {
      setFormData({
        name: bikeData.name,
        description: bikeData.description,
        pricePerHour: bikeData.pricePerHour,
        cc: bikeData.cc,
        year: bikeData.year,
        model: bikeData.model,
        brand: bikeData.brand,
        img: bikeData.img,
      });
    }
  }, [bikeData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "pricePerHour" || name === "cc" || name === "year") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bikeData) {
      await updateBike({ id: bikeData._id, data: formData });
    } else {
      await addBike(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center font-[Roboto]">
      <div className="backdrop-blur-lg backdrop-brightness-110 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          {bikeData ? "Edit Bike" : "Add Bike"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter bike name"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Enter bike image link"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter bike description"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="pricePerHour"
            placeholder="Enter Price per hour"
            value={formData.pricePerHour || ""}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Enter bike CC"
            name="cc"
            value={formData.cc || ""}
            onChange={handleChange}
            min="0"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Enter bike manufacture year "
            value={formData.year || ""}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Model</option>
            <option value="Standard">Standard</option>
            <option value="Sport">Sport</option>
            <option value="Touring">Touring</option>
            <option value="Off-road">Off-road</option>
          </select>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Brand</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Kawasaki">Kawasaki</option>
            <option value="Yamaha">Yamaha</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {bikeData ? "Update Bike" : "Add Bike"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-black p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BikeFormModal;
