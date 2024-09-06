import { Link } from "react-router-dom";
import { useGetBikesQuery } from "../../../redux/features/user/userApi";
import { motion } from "framer-motion";
import { fadeLeft } from "../../../Animation/constant";

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
  img: string;
};

const Featured = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);
  if (isLoading) {
    return (
      <span className="loading loading-ring loading-lg h-full mx-auto"></span>
    );
  }
  const bikes = data.data.slice(0, 6);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-0 md:px-8">
        <h2 className="text-4xl lg:text-5xl text-gray-800 mb-8 text-center font-[Oswald]">
          Available Bikes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 font-[Roboto]">
          {bikes.map((bike: Bike) => (
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileTap={{ scale: 0.95 }}
              key={bike._id}
              className="border border-gray-300 rounded-lg p-4 m-2 mx-auto md:p-10 md:m-4 w-80 lg:w-auto text-center shadow-lg font-[Roboto]"
            >
              <img
                src={bike.img}
                alt={bike.brand}
                className="w-full h-48 object-cover"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">{bike.name}</h3>
                <p className="text-gray-600 mb-2">{bike.model}</p>

                <p className="text-gray-800 mb-2">Brand: {bike.brand}</p>

                <p className="text-gray-900 font-bold mb-4">
                  ৳{bike.pricePerHour}
                </p>
                <Link to={`/bikes/${bike._id}`}>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/bikes">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-slate-700">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
