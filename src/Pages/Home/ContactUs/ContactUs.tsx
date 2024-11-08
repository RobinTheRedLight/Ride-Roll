import { useState } from "react";
import { motion } from "framer-motion";
import { cards, fadeRight, variants } from "../../../Animation/constant";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setSubmitted(true);
  };

  return (
    <div className="py-8 font-[Roboto] text-secondary-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl  lg:text-4xl mb-8 sm:mb-12 text-center font-[Oswald] uppercase">
          Contact Us
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-16">
          {/* Left Info Section */}
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:w-1/2 mb-10 lg:mb-0 "
          >
            <motion.h2
              variants={cards}
              className="text-2xl sm:text-3xl lg:text-4xl  mb-6 sm:mb-12 text-left font-[Oswald] tracking-wide"
            >
              Get in Touch
            </motion.h2>
            <motion.h3
              variants={cards}
              className="text-xl sm:text-2xl font-bold  mb-4"
            >
              Ready to ride? Contact us for your perfect bike rental
            </motion.h3>
            <motion.p
              variants={cards}
              className="text-sm sm:text-md lg:text-lg  mb-8 leading-relaxed"
            >
              Ditch the car, embrace the ride! We offer a wide selection of
              bikes for all types of adventures. Whether you're exploring the
              city, hitting the trails, or cruising the coast, we have the
              perfect bike to get you there. Let us know what you need, and
              we'll help you get rolling!
            </motion.p>

            {/* Social Icons */}
            <motion.div
              variants={cards}
              className="grid grid-cols-3 gap-4 w-32"
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            {submitted ? (
              <div className="text-center text-green-600">
                Thank you for your message! We will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter a valid email address"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                  ></textarea>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="">
                    I accept the{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>
                  </label>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary  py-3 px-6  transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
