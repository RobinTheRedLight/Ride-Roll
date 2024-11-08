import { AiOutlineClockCircle, AiOutlineSetting } from "react-icons/ai";
import { LiaUserShieldSolid } from "react-icons/lia";

type Benefit = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
};

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Quick & Easy Reservations",
    description:
      "Book your ride with a click, and enjoy instant confirmation for peace of mind.",
    icon: <AiOutlineClockCircle className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Ride Your Way",
    description:
      "Explore a personalized selection of bikes to match your style and adventure.",
    icon: <AiOutlineSetting className="w-8 h-8 text-green-500" />,
  },
  {
    id: 3,
    title: "Trustworthy & Secure",
    description:
      "We partner only with certified stores, ensuring a safe and reliable experience.",
    icon: <LiaUserShieldSolid className="w-8 h-8 text-red-500" />,
  },
];

const ChooseUs = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-center p-4 bg-secondary text-secondary-content rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              <div className="mr-4 flex-shrink-0">{benefit.icon}</div>{" "}
              {/* Icon aligned side by side */}
              <div>
                <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                <p className="">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
