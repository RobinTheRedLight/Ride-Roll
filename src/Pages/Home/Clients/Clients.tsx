import React from "react";
import {
  FaApple,
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaFacebook,
} from "react-icons/fa";

const OurClients: React.FC = () => {
  return (
    <section className="pt-8  pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-[Oswald] uppercase text-center text-neutral mb-5 ">
          Our Clients
        </h2>
        <p className="text-center text-neutral mb-8">
          We are proud to work with some of the world’s leading companies.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Company 1 */}
          <div className="flex flex-col items-center p-6 bg-secondary text-secondary-content rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaApple className="text-5xl  mb-4" />
            <p className="text-lg font-semibold ">Apple</p>
          </div>

          {/* Company 2 */}
          <div className="flex flex-col items-center p-6 bg-secondary text-secondary-content rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaGoogle className="text-5xl  mb-4" />
            <p className="text-lg font-semibold ">Google</p>
          </div>

          {/* Company 3 */}
          <div className="flex flex-col items-center p-6 bg-secondary text-secondary-content rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaMicrosoft className="text-5xl  mb-4" />
            <p className="text-lg font-semibold ">Microsoft</p>
          </div>

          {/* Company 4 */}
          <div className="flex flex-col items-center p-6 bg-secondary text-secondary-content rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaAmazon className="text-5xl  mb-4" />
            <p className="text-lg font-semibold ">Amazon</p>
          </div>

          {/* Company 5 */}
          <div className="flex flex-col items-center p-6 bg-secondary text-secondary-content rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaFacebook className="text-5xl  mb-4" />
            <p className="text-lg font-semibold ">Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
