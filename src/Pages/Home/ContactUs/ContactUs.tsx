import { useState } from "react";

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

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically handle form submission to a server
    // For now, we'll just log the form data and show a submitted state
    console.log("Form submitted:", formData);

    // Reset form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Set submitted state
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-gray-100 font-[Roboto]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          Contact Us
        </h2>
        {submitted ? (
          <div className="text-center text-green-600">
            Thank you for your message! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={5}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
