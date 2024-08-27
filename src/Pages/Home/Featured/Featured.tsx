import bike1 from '../../../assets/bike.jpg'


const Featured = () => {
  const bikes = [
    {
      name: "Mountain Bike",
      description: "A durable mountain bike for rough terrains.",
      pricePerHour: 15,
      cc: 250,
      year: 2022,
      model: "X1",
      brand: "Yamaha",
    },
    {
      name: "Mountain Bike2",
      description: "A durable mountain bike for rough terrains.",
      pricePerHour: 15,
      cc: 250,
      year: 2022,
      model: "X1",
      brand: "Yamaha",
    },
    {
      name: "Mountain Bike3",
      description: "A durable mountain bike for rough terrains.",
      pricePerHour: 15,
      cc: 250,
      year: 2022,
      model: "X1",
      brand: "Yamaha",
    },
    {
      name: "Mountain Bike4",
      description: "A durable mountain bike for rough terrains.",
      pricePerHour: 15,
      cc: 250,
      year: 2022,
      model: "X1",
      brand: "Yamaha",
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl  text-gray-800 mb-8 text-center font-[Oswald]">
          Available Bikes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 font-[Roboto]">
          {bikes.map((bike) => (
            <div
              key={bike.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={bike1}
                alt={bike.brand}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {bike.brand}
                </h3>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
