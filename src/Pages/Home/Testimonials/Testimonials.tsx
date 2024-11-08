import { motion } from "framer-motion";
import { fadeLeft } from "../../../Animation/constant";
import img1 from "../../../assets/aboutUs/img1.png";
import img2 from "../../../assets/aboutUs/img2.png";

type Testimonial = {
  id: number;
  quote: string;
  customerName: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This bike has transformed my daily commute. Highly recommend!",
    customerName: "Alice Johnson",
    image: img2,
  },
  {
    id: 2,
    quote:
      "Excellent customer service and an even better bike. Couldn't be happier!",
    customerName: "John Doe",
    image: img1,
  },
  {
    id: 3,
    quote:
      "Quality bikes at great prices. This is my second purchase and I am thrilled.",
    customerName: "Jane Smith",
    image: img2,
  },
];

const Testimonials = () => {
  return (
    <section className=" body-font  py-8">
      <div className="container max-w-7xl px-5 mx-auto">
        <div className="mb-8 text-neutral">
          <h2 className="text-3xl lg:text-4xl text-center font-[Oswald] uppercase">
            Reviews
          </h2>
          <p className="text-center mt-5">
            Here are some of our happy customers who have purchased our bikes.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-4 lg:w-1/3 w-full "
            >
              <div className="h-full text-center rounded-lg shadow-lg p-6 border bg-secondary ">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-base bg-base-200"
                  src={testimonial.image}
                />
                <p className="leading-relaxed text-lg italic mb-4">
                  "{testimonial.quote}"
                </p>
                <span className="inline-block h-1 w-10 rounded bg-info mt-4 mb-4"></span>
                <h2 className=" font-medium title-font tracking-wider text-sm">
                  {testimonial.customerName}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
