import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import video from "../../../assets/Home/video.mp4";
import { fadeUp } from "../../../Animation/constant";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/bikes?search=${searchTerm}`);
    }
  };

  return (
    <div className="relative w-full h-screen font-[Roboto]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
          Explore the World on Two Wheels
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Find your perfect ride today!
        </p>

        {/* Call to Action Button */}
        <Link to="/bikes">
          <button className="bg-[#ec3c10] hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full mb-4">
            Book a Ride!
          </button>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full p-2 shadow-lg w-full max-w-md">
          <input
            type="text"
            placeholder="Search bike availability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 text-black rounded-l-full focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#ec3c10] text-white px-4 py-2 rounded-full"
          >
            Search
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
