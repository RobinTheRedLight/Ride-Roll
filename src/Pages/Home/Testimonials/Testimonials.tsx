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
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Roboto]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <p className="text-lg italic text-gray-700 mb-4">
                "{testimonial.quote}"
              </p>
              <p className="text-right text-gray-900 font-bold">
                - {testimonial.customerName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
