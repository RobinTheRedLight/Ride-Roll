import { motion } from "framer-motion";
import { fadeLeft } from "../../../Animation/constant";

type Benefit = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
};

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Best Prices",
    description:
      "We offer the most competitive prices on the market without compromising on quality.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c.374 0 .732.148 1 .414l3 3c.268.266.268.698 0 .964l-3 3A1.414 1.414 0 0112 16V8z"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Wide Selection",
    description:
      "Find a wide variety of bikes to suit every need and preference, from mountain bikes to road bikes.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8h4l2-4h8l2 4h4M5 12h14M6 16h12m1 4H5"
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Excellent Customer Service",
    description:
      "Our dedicated support team is here to help you with all your queries and needs.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 6v14H4V6a2 2 0 012-2h12a2 2 0 012 2z"
        ></path>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4"></path>
      </svg>
    ),
  },
];
const ChooseUs = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl text-gray-800 mb-8 text-center font-[Oswald]">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Roboto] mt-10">
          {benefits.map((benefit) => (
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileTap={{ scale: 0.95 }}
              key={benefit.id}
              className=" p-6 rounded-lg shadow-lg text-center bg-gray-100"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
