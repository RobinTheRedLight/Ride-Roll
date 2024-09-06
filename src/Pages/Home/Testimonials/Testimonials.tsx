import { motion } from "framer-motion";
import { fadeLeft } from "../../../Animation/constant";
type Testimonial = {
  id: number;
  quote: string;
  customerName: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This bike has transformed my daily commute. Highly recommend!",
    customerName: "Alice Johnson",
  },
  {
    id: 2,
    quote:
      "Excellent customer service and an even better bike. Couldn't be happier!",
    customerName: "John Doe",
  },
  {
    id: 3,
    quote:
      "Quality bikes at great prices. This is my second purchase and I am thrilled.",
    customerName: "Jane Smith",
  },
];

const Testimonials = () => {
  return (
    <div className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl  mb-8 text-center font-[Oswald]">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Roboto] md:mt-10">
          {testimonials.map((testimonial) => (
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileTap={{ scale: 0.95 }}
              key={testimonial.id}
              className=" p-6 rounded-lg shadow-lg border"
            >
              <p className="text-lg italic  mb-4">
                "{testimonial.quote}"
              </p>
              <p className="text-right  font-bold">
                - {testimonial.customerName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
